import Page from '../js/Page';

var AmChartsSeries = function () {
    function getIndexOfCharts(serieId, graphs) {
        let index = -1;
        for (let i = 0; i < graphs.length; i++) {
            if (graphs[i].id == serieId) {
                index = i;
                break;
            }
        }
        return index;
    }

    function updateChart(currentChart) {
        var rotate = $('#rotate').val().toLowerCase();
        var widgetId = $('#widgetId').val();
        currentChart.rotate = rotate == 'true';
        var url = Page.getApplicationPath() + "api/page/charts?pageId=" + parent.Benner.Page.pageId + '&widgetId=' + widgetId;
        $.ajax({
            type: 'PUT',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(currentChart)
        }).done(function (data) {
            if (data) {
                parent.Benner.ModalPage.hide();
                parent.location.reload(true);
            }
        });
    }

    function setSerieType(chartType, serieDefinition) {
        switch (chartType) {
            case 'area':
                serieDefinition.type = 'line';
                serieDefinition.bullet = 'round';
                serieDefinition.lineAlpha = 0;
                serieDefinition.fillAlphas = 0.7;
                break;
            case 'bar':
                serieDefinition.type = 'column';
                serieDefinition.bullet = null,
                    $('#rotate').val(true);
                serieDefinition.lineAlpha = 0;
                serieDefinition.fillAlphas = 1;
                break;
            case 'column':
                serieDefinition.type = 'column';
                serieDefinition.bullet = null;
                $('#rotate').val(false);
                serieDefinition.lineAlpha = 0;
                serieDefinition.fillAlphas = 1;
                break;
            case 'line':
                serieDefinition.type = 'line';
                serieDefinition.bullet = 'round';
                serieDefinition.lineAlpha = 1;
                serieDefinition.fillAlphas = 0;
                break;
        }
    }

    function loadUI(serieDefinition, rotate) {

        $("#identificador").val(serieDefinition.id);

        $("#titulo").val(serieDefinition.title);

        $("#valor").val(serieDefinition.valueField.toUpperCase());

        if (serieDefinition.type == 'column') {
            if (rotate == 'true') {
                $('#bar').addClass('selected');
            } else {
                $('#column').addClass('selected');
            }
        }

        if (serieDefinition.type == 'line') {
            if (serieDefinition.fillAlphas > 0) {
                $('#area').addClass('selected');
            } else {
                $('#line').addClass('selected');
            }
        }

        if (serieDefinition.balloonText) {
            $('#balloonText').val(serieDefinition.balloonText);
        }

        if (serieDefinition.labelText) {
            $('#labelText').val(serieDefinition.labelText);
        }

        if (serieDefinition.fillColors) {
            $('#cor').val(serieDefinition.fillColors);
        }
    }

    return {
        init: function () {
            var rotate = $("#rotate").val().toLowerCase();
            var serieId = $('#serieId').val();

            var currentChart = parent.Benner.AmChartsWidget.getChart($('#widgetId').val());
            var serieDefinition = _.find(currentChart.graphs, function (graph) { return graph.id == serieId; });

            if (serieDefinition == null) {
                var type;

                if (currentChart.type == 'radar')
                    type = 'line';
                else if (rotate == "true")
                    type = 'bar';
                else
                    type = 'column';

                serieDefinition = {
                    'balloonText': '[[category]] : [[value]]',
                    'labelText': '',
                    'id': 'serie-' + new Date().getTime(),
                    'title': $('#valor').val().toLowerCase(),
                    'valueField': $('#valor').val(),
                    'alphaField': 'fill_alpha_field'
                };

                setSerieType(type, serieDefinition);

                currentChart.graphs.push(serieDefinition);
            }

            loadUI(serieDefinition, rotate);

            $('.minicolors-input').minicolors({ position: 'top left', theme: 'bootstrap' });

            $('.chart-type').on('click', function () {
                $('.chart-type').removeClass('selected');
                $(this).addClass('selected');
                $('#rotate').val(false);
                var chartType = $(this).attr('id');

                setSerieType(chartType, serieDefinition);
            });

            $('#excluir').on('click', function () {
                let indexOf = getIndexOfCharts(serieDefinition.id, currentChart.graphs);
                currentChart.graphs.splice(indexOf, 1);

                updateChart(currentChart);
            });

            $('#salvar').on('click', function () {
                updateChart(currentChart);
            });

            $('#cancelar').on('click', function () {
                parent.Benner.ModalPage.hide();
            });

            $('#valor').on('change', function () {
                serieDefinition.valueField = $(this).val().toLowerCase();
                $("#titulo").val($("#valor option:selected").text().toLowerCase());
                $("#titulo").blur();
            });

            $('#balloonText').on('change', function () {
                serieDefinition.balloonText = $(this).val();
            });

            $('#labelText').on('change', function () {
                serieDefinition.labelText = $(this).val();
            });

            $('#titulo').on('blur', function () {
                serieDefinition.title = $(this).val();
            });

            $('#cor').on('blur', function () {
                if ($(this).val() != '') {
                    serieDefinition.fillColors = $(this).val();
                    serieDefinition.lineColor = $(this).val();
                    serieDefinition.bulletColor = $(this).val();
                } else {
                    delete serieDefinition.fillColors;
                    delete serieDefinition.bulletColor;
                    delete serieDefinition.lineColor;
                }
            });

            import('../js/AceEditor').then(function (module) {
                var editorCustomizacao = module.default.ace.edit('customizacao');
                editorCustomizacao.$blockScrolling = Infinity;
                editorCustomizacao.setReadOnly(currentChart.version !== "4");

                let sessionCustomizacao = editorCustomizacao.getSession();
                sessionCustomizacao.setMode('ace/mode/javascript');

                if (serieDefinition.code == undefined) {
                    sessionCustomizacao.setValue("function customization(serie, valueAxis) {\n\r}");
                } else {
                    sessionCustomizacao.setValue(serieDefinition.code);
                }

                editorCustomizacao.on('blur', function () {
                    let identificador = $("#identificador").val();
                    let codeCustomization = editorCustomizacao.getSession().getValue();

                    let serieIndex = _.findIndex(currentChart.graphs, function (graph) { return graph.id == identificador; });
                    if (serieIndex >= 0) {
                        currentChart.graphs[serieIndex].code = codeCustomization;
                    }
                });

                var editor = module.default.ace.edit('editor');
                editor.$blockScrolling = Infinity;
                editor.setReadOnly(currentChart.version === "4");
                let session = editor.getSession();
                session.setMode('ace/mode/javascript');
                session.setValue(JSON.stringify(serieDefinition, null, '\t'));
                editor.on('blur', function () {
                    serieDefinition = JSON.parse(editor.getSession().getValue());
                    var oldSerieIndex = _.findIndex(currentChart.graphs, function (graph) { return graph.id == serieDefinition.id; });
                    if (oldSerieIndex >= 0) {
                        currentChart.graphs[oldSerieIndex] = serieDefinition;
                    }
                });

                $('a[data-toggle="tab"]').on('shown.bs.tab', function (evt) {
                    var tab = $(evt.target).attr('href');
                    if (tab == '#tabDefinicao') {
                        editor.getSession().setValue(JSON.stringify(serieDefinition, null, '\t'), 1);
                        editor.resize();
                    } else if (tab == '#tabSerie') {
                        loadUI(serieDefinition, rotate);
                    }
                });
            });
        }
    };

}();

export default AmChartsSeries;