var AmChartsAttributes = function () {
    var pieAndDonut =
    {
        'type': 'pie',
        'language': 'pt',
        'theme': 'light',
        'pullOutOnlyOne': true,
        'export': {
            'enabled': true
        },
        'titleField': '',
        'valueField': '',
        'alphaField': 'fill_alpha_field',
        'balloonText': '[[title]]<br><span style=\'font-size:14px\'><b>[[value]]</b> ([[percents]]%)</span>',
        'labelText': '[[title]]: [[percents]]%',
        'labelsEnabled': true,
        'legend': {
            'enabled': false,
            'align': 'center',
            'markerType': 'circle'
        },
        'innerRadius': '',
        "version": "4",
        "theme4": ""
    };

    var barColumnPointLineAreaRadar =
    {
        'type': 'serial',
        'language': 'pt',
        'theme': 'light',
        'export': {
            'enabled': true
        },
        'categoryField': '',
        'startDuration': 1,
        'categoryAxis': {
            'gridPosition': 'start'
        },
        'graphs': [
            {
                'labelText': '',
                'balloonText': '[[category]] : [[value]]',
                'id': 'AmGraph-1',
                'title': '',
                'alphaField': 'fill_alpha_field',
                'valueField': '',
            }
        ],
        'valueAxes': [
            {
                'id': 'ValueAxis-1',
                'title': ''
            }
        ],
        'legend': {
            'enabled': true,
            'position': 'bottom',
            'useGraphSettings': true
        },
        "version": "4",
        "theme4": "material"

    };

    function setVisibility() {
        var chartDefinition = getChartDefinition();
        var chartType = parseInt(getValue('TIPOGRAFICOSIMPLES'));

        $(".show-when-pie").hide();
        $(".show-when-serial").hide();

        if (chartType == 2 || chartType == 3 || chartType == 4 || chartType == 5) {
            $(".show-when-serial").show();
        }
        else if (chartType == 6 || chartType == 7) {
            $(".show-when-pie").show();
        }

        if ($('#version').val() === "4" ) {
            $("#themeVersion3").hide();
            $("#themeVersion4").show();
        } else {
            $("#themeVersion3").show();
            $("#themeVersion4").hide();
        }
    }

    function chartTypeChaged(chartDefinition, chartType) {

        var categoryField = $('#category').val();
        var valueField = $('#value').val();

        if (categoryField)
            categoryField = categoryField.toLowerCase();
        if (valueField)
            valueField = valueField.toLowerCase();

        chartType = parseInt(chartType);

        if (chartType == 2 || chartType == 3 || chartType == 4 || chartType == 5 || chartType == 9) {
            if (chartDefinition.type != 'serial' && chartDefinition.type != 'radar') {
                barColumnPointLineAreaRadar.theme = chartDefinition.theme;
                barColumnPointLineAreaRadar.theme4 = chartDefinition.theme4;
                barColumnPointLineAreaRadar.version = chartDefinition.version;

                chartDefinition = barColumnPointLineAreaRadar;
                chartDefinition.categoryField = categoryField;
                chartDefinition.graphs[0].valueField = valueField;
                chartDefinition.graphs[0].title = valueField;
            }

            if (chartType == 9)
                chartDefinition.type = 'radar';
            else
                chartDefinition.type = 'serial';
        }
        else if (chartType == 6 || chartType == 7) {
            if (chartDefinition.type != 'pie') {
                pieAndDonut.theme = chartDefinition.theme;
                pieAndDonut.theme4 = chartDefinition.theme4;
                chartDefinition = pieAndDonut;
            }
            chartDefinition.titleField = categoryField;
            chartDefinition.valueField = valueField;
        }

        switch (chartType) {
            case 2: //Line
                chartDefinition.graphs[0].type = 'line';
                chartDefinition.graphs[0].fillAlphas = 0;
                chartDefinition.graphs[0].bullet = 'round';
                delete chartDefinition.rotate;
                break;
            case 3: //Bar
                chartDefinition.graphs[0].type = 'column';
                chartDefinition.graphs[0].fillAlphas = 1;
                chartDefinition.rotate = true;
                break;
            case 4: //Column
                chartDefinition.graphs[0].type = 'column';
                chartDefinition.graphs[0].fillAlphas = 1;
                delete chartDefinition.rotate;
                break;
            case 5: //Area
                chartDefinition.graphs[0].type = 'line';
                chartDefinition.graphs[0].fillAlphas = 0.3;
                chartDefinition.graphs[0].bullet = 'round';
                delete chartDefinition.rotate;
                break;
            case 6: //Pie
                chartDefinition.innerRadius = '0%';
                break;
            case 7: //Doughnut
                chartDefinition.innerRadius = '40%';
                break;
            case 9: //Radar
                chartDefinition.graphs[0].type = 'line';
                chartDefinition.graphs[0].fillAlphas = 0.3;
                chartDefinition.graphs[0].bullet = 'round';
                delete chartDefinition.rotate;
            default:
        }

        chartDefinition.version = $('#version').val();
        setChartDefinition(chartDefinition);
        showJavascriptNote();
    }

    function showJavascriptNote() {

        $('.advanced-editor .label-title-help').removeClass('hidden');
        $('.advanced-editor').addClass('disabled');
        $('.advanced-editor a').attr('style', 'pointer-events: none;');
    }

    function loadUIData() {
        var chartDefinition = getChartDefinition();

        if (chartDefinition == null)
            return;

        var chartType = getValue('TIPOGRAFICOSIMPLES');
        $('div[chart-value="' + chartType + '"]').addClass('selected');

        if (chartDefinition.categoryField) {
            $('#category').val(chartDefinition.categoryField.toUpperCase());
        }

        if (chartDefinition.titleField) {
            $('#category').val(chartDefinition.titleField.toUpperCase());
        }

        if (chartDefinition.version) {
            $('#version').val(chartDefinition.version);
        }

        if (chartDefinition.legend) {
            $('#legendText').val('{ "labelText": "' + chartDefinition.legend.labelText + '", "valueText": "' + chartDefinition.legend.valueText + '" }');
        }

        if (chartDefinition.labelText) {
            if (chartDefinition.labelsEnabled === false)
                $('#labelText').val("");
            else
                $('#labelText').val(chartDefinition.labelText);
        }

        if (chartDefinition.valueField) {
            $('#value').val(chartDefinition.valueField.toUpperCase());
        }

        if (chartDefinition.graphs && chartDefinition.graphs[0].valueField) {
            $('#value').val(chartDefinition.graphs[0].valueField.toUpperCase());
        }

        if (chartDefinition.legend) {
            if (chartDefinition.legend.enabled)
                $('#legend').val(chartDefinition.legend.position);
            else
                $('#legend').val("none");
        }

        if (chartDefinition.theme) {
            $('a.' + chartDefinition.theme).closest('li').addClass('active');
        } else {
            $('a.default').closest('li').addClass('active');
        }

        if (chartDefinition.theme4) {
            $('a.' + chartDefinition.theme4).closest('li').addClass('active');
        } else {
            $('a.material').closest('li').addClass('active');
        }
        
        if (chartDefinition.depth3D > 0) {
            document.getElementById('grafico3D').checked = true;
        }

        if (chartDefinition.categoryAxis && chartDefinition.categoryAxis.labelRotation > 0) {
            document.getElementById('rotateLabel').checked = true;
        }

        if (chartDefinition.valueAxes && chartDefinition.valueAxes.length > 0) {
            if (chartDefinition.valueAxes[0].stackType) {
                document.getElementById('empilharSeries').checked = true;
            }

            if (chartDefinition.valueAxes[0].title) {
                document.getElementById('legendaEixo').value = chartDefinition.valueAxes[0].title;
            }
        }
    }

    function getChartDefinition() {
        var chartDefinition = $('[data-field="CHARTDEFINITION"] > input').val();
        if (chartDefinition.trim() == "")
            return null;
        return JSON.parse(chartDefinition);
    }

    function setChartDefinition(chartDefinition) {
        $('[data-field="CHARTDEFINITION"] > input').val(JSON.stringify(chartDefinition));
    }

    function setValue(fieldName, value) {
        $('[data-field="' + fieldName + '"] > input').val(value);
    }

    function getValue(fieldName) {
        return $('[data-field="' + fieldName + '"] > input').val();
    }

    return {
        init: function () {
            var chartDefinition = getChartDefinition();

            if (chartDefinition == null) {
                chartTypeChaged({ type: 'none' }, 4);
            }

            loadUIData();
            setVisibility();

            $(document).on('click', '.chart-type', function () {
                $('.chart-type').removeClass('selected');
                $(this).addClass('selected');
                var typeValue = $(this).attr('chart-value');
                var chartDefinition = getChartDefinition();
                setValue('TIPOGRAFICOSIMPLES', typeValue);
                chartTypeChaged(chartDefinition, typeValue);
                setVisibility();
            });

            $('#category').on('change', function () {
                var chartDefinition = getChartDefinition();
                if (chartDefinition.type == "pie")
                    chartDefinition.titleField = $(this).val().toLowerCase();
                else
                    chartDefinition.categoryField = $(this).val().toLowerCase();
                setChartDefinition(chartDefinition);
            });

            $('#value').on('change', function () {
                var chartDefinition = getChartDefinition();

                if (chartDefinition.valueField)
                    chartDefinition.valueField = $(this).val().toLowerCase();

                if (chartDefinition.graphs && chartDefinition.graphs[0]) {
                    chartDefinition.graphs[0].valueField = $(this).val().toLowerCase();
                    chartDefinition.graphs[0].title = $("#value option:selected").text().toLowerCase();
                }

                setChartDefinition(chartDefinition);
            });

            $('#legendText').on('change', function () {
                var chartDefinition = getChartDefinition();
                var legend = JSON.parse($(this).val());
                chartDefinition.legend.labelText = legend.labelText;
                chartDefinition.legend.valueText = legend.valueText;
                setChartDefinition(chartDefinition);
            });

            $('#labelText').on('change', function () {
                var chartDefinition = getChartDefinition();
                var labelText = $(this).val();

                if (labelText.trim() === "")
                    chartDefinition.labelsEnabled = false;
                else {
                    chartDefinition.labelsEnabled = true;
                    chartDefinition.labelText = labelText;
                }

                setChartDefinition(chartDefinition);
            });

            $('#legend').on('change', function () {
                var chartDefinition = getChartDefinition();
                var position = $(this).val().toLowerCase();
                if (position === "none")
                    chartDefinition.legend.enabled = false;
                else {
                    chartDefinition.legend.enabled = true;
                    chartDefinition.legend.position = position;
                }
                setChartDefinition(chartDefinition);
            });

            $('#empilharSeries').on('change', function () {
                var chartDefinition = getChartDefinition();
                if (document.getElementById('empilharSeries').checked == true) {
                    chartDefinition.valueAxes[0].stackType = 'regular';
                }
                else {
                    delete chartDefinition.valueAxes[0].stackType;
                }
                setChartDefinition(chartDefinition);
            });

            $('#rotateLabel').on('change', function () {
                var chartDefinition = getChartDefinition();
                if (document.getElementById('rotateLabel').checked == true) {
                    chartDefinition.categoryAxis.labelRotation = 15;
                }
                else {
                    delete chartDefinition.categoryAxis.labelRotation;
                }
                setChartDefinition(chartDefinition);
            });

            $('.chart-themes a').on('click', function () {
                var chartDefinition = getChartDefinition();
                $('.chart-themes li').removeClass('active');
                $(this).closest('li').addClass('active');
                chartDefinition.theme = $(this).attr('class');
                setChartDefinition(chartDefinition);
            });

            $('#grafico3D').on('change', function () {
                var chartDefinition = getChartDefinition();
                if (document.getElementById('grafico3D').checked == true) {
                    chartDefinition.angle = 30;
                    chartDefinition.depth3D = 30;
                } else {
                    chartDefinition.angle = 0;
                    chartDefinition.depth3D = 0;
                }
                setChartDefinition(chartDefinition);
            });

            $('#legendaEixo').on('blur', function () {
                var chartDefinition = getChartDefinition();
                chartDefinition.valueAxes[0].title = $(this).val();
                setChartDefinition(chartDefinition);
            });

            $('#version').on('change', function() {
                let chartDefinition = getChartDefinition();
                chartDefinition.version = this.value;
                $('.chart-themes li').removeClass('active');

                if (this.value === "3") {
                    $("#themeVersion3").show();
                    $("#themeVersion4").hide();
                    if (!chartDefinition.theme) {
                        chartDefinition.theme = "default";
                    }
                    
                } else {
                    $("#themeVersion3").hide();
                    $("#themeVersion4").show();
                    if (!chartDefinition.theme4) {
                        chartDefinition.theme4 = "material";
                    }                    
                }   
                if (this.value === "3" && chartDefinition.theme) {
                    $('a.' + chartDefinition.theme).closest('li').addClass('active');
                } 
                if (this.value === "4" && chartDefinition.theme4) {
                    $('a.' + chartDefinition.theme4).closest('li').addClass('active');
                } 

                setChartDefinition(chartDefinition);
            });

            $('#themeVersion4 a').on('click', function () {
                let chartDefinition = getChartDefinition();
                $('#themeVersion4 li').removeClass('active');
                $(this).parent().addClass('active');
                
                chartDefinition.theme4 = $(this).attr('class');

                setChartDefinition(chartDefinition);
            });

            import('../js/AceEditor').then(function (module) {
                if (chartDefinition == null)
                    return;
                var editorCustomizacao = module.default.ace.edit('customizacao');
                editorCustomizacao.$blockScrolling = Infinity;
                editorCustomizacao.setReadOnly(chartDefinition.version !== "4");

                let sessionCustomizacao = editorCustomizacao.getSession();
                sessionCustomizacao.setMode('ace/mode/javascript');

                if (chartDefinition.code == undefined) {
                    sessionCustomizacao.setValue("function customization(chart) {\n\r}");
                } else {
                    sessionCustomizacao.setValue(chartDefinition.code);
                }

                editorCustomizacao.on('blur', function () {
                    let codeCustomization = editorCustomizacao.getSession().getValue();
                    chartDefinition.code = codeCustomization;

                    setChartDefinition(chartDefinition);
                });

                var editor = module.default.ace.edit('editor');
                editor.$blockScrolling = Infinity;
                editor.setReadOnly(chartDefinition.version === "4");
                let session = editor.getSession();
                session.setMode('ace/mode/javascript');
                session.setValue(JSON.stringify(chartDefinition, null, '\t'));

                editor.on('blur', function () {
                    var chartDefinition = JSON.parse(editor.getSession().getValue());
                    setChartDefinition(chartDefinition);
                });

                $('a[data-toggle="tab"]').on('shown.bs.tab', function (evt) {
                    var tab = $(evt.target).attr('href');
                    if (tab == '#tabDefinicao') {
                        var chartDefinition = getChartDefinition();
                        editor.getSession().setValue(JSON.stringify(chartDefinition, null, '\t'), 1);
                        editor.resize();
                    } else if (tab == '#tabSerie') {
                        loadUIData();
                    }
                });
            });
        }
    };
}();

export default AmChartsAttributes;
