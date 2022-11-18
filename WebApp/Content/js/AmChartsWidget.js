import Page from './Page';
import GraphicRadar from './amcharts/GraphicRadar';
import GraphicPie from './amcharts/GraphicPie';
import GraphicXY from './amcharts/GraphicXY';
import GraphicBase from './amcharts/GraphicBase';

var AmChartsWidget = function () {
    var charts = [];
    var chartVariable = null;

    function verifyDataLoaderLength(chartVariable, id, state) {
        if (chartVariable.version === "3") {
            chartVariable = setExporterPath(chartVariable);
        }

        $.ajax({
            type: "POST",
            url: Page.getApplicationPath() + 'api/datachart/',
            data: JSON.stringify(state),
            contentType: "application/json; charset=utf-8",
			dataType: "json",
			cache: false,
			async: true,
            success: function (jsonResponse) {
                if ((jsonResponse.itens == null || jsonResponse.itens.length == 0) && jsonResponse.menssage != null)
                    setEmptyDataOrFailMessage(chartVariable, id, jsonResponse.menssage);
                else if (jsonResponse.error != undefined)
                    setEmptyDataOrFailMessage(chartVariable, id, jsonResponse.error);
                else
                    setData(chartVariable, jsonResponse.itens);
            },
            error: function (jqxhr, textStatus, error) {
                setEmptyDataOrFailMessage(chartVariable, id, jqxhr.responseJSON);
            }
        });

        // redraw it
        if (chartVariable.version === "3") {
            chartVariable.validateNow();
        }
    }

    function setExporterPath(chartVariable) {
        chartVariable.path = Page.getApplicationPath() + 'content/assets/plugins/amcharts/';
        return chartVariable;
    }

    function setEmptyDataOrFailMessage(chart, chartDiv, message) {
        if (chart.version === "3") {
            chart.addLabel(0, '50%', message, 'center', 12);
            chart.chartDiv.style.opacity = 0.7;
            chart.legend.enabled = false;
        }
        else {
            var title = chart.titles.create();
            title.text = message;
            title.opacity = 0.7;
            title.aling = "center";
            title.fontSize = "12px"
            title.paddingTop = "25%"
        }
    }

    function setData(chart, data) {
        if (chart.version === "3") {
            chart.dataProvider = data;
            chart.validateData();
        } else {
            chart.data = data;
        }
    }

    function internalHandleClick(uniqueId, data, commandName) {
        var entity = null;
        if (data.item)
            entity = data.item.dataContext;
        else
            entity = data.dataItem.dataContext;

        var alpha = entity["fill_alpha_field"]

        _.forEach(data.chart.dataProvider, function (item) {
            delete item["fill_alpha_field"];
        });

        if (!alpha || alpha == 1)
            entity["fill_alpha_field"] = 0.5;
        else {
            entity["fill_alpha_field"] = 1;
        }

        let entityId = (entity.id) ? entity.id : -1;
        GraphicBase.validateDatetimeField(entity);
        let entityJson = JSON.stringify(entity);
        let parameter = commandName + "$" + entityId + "$" + entityJson;
        document.getElementById(uniqueId.replaceAll("$", "_") + "_AmChartsItemSelected").value = entityJson;

        __doPostBack(uniqueId, parameter);
    }

    function createChartV4(id, objDefinition, uniqueId, commandName) {

        var chart = null;
        
        if (objDefinition.type == "pie") {

            let graphicPie = new GraphicPie(uniqueId, commandName);
            chart = graphicPie.getChart(id, objDefinition);
        } else if (objDefinition.type == "radar") {

            let graphicRadar = new GraphicRadar(uniqueId, commandName);
            chart = graphicRadar.getChart(id, objDefinition);
        } else {

            let graphicXY = new GraphicXY(uniqueId, commandName);
            chart = graphicXY.getChart(id, objDefinition);
        }
        
        return chart;
    }

    return {
        init: function (id, objDefinition, uniqueId, commandName, state) {
            if (_.find(charts, function (chart) { return chart.id == id }) == undefined) {
                var widgetId = $('#' + id).closest('.widget').attr('id');
                charts.push({ 'id': widgetId, 'definition': JSON.stringify(objDefinition, null, '\t') });
            }

            objDefinition.startDuration = 0.2;

            if (objDefinition.version == "4") {

                chartVariable = createChartV4(id, objDefinition, uniqueId, commandName);
                verifyDataLoaderLength(chartVariable, id, state);
            } else {
                var backgroundColor = '#FFF'
                if (objDefinition.theme) {
                    if (objDefinition.theme == 'chalk' || objDefinition.theme == 'dark') {
                        backgroundColor = '#282828';
                    } else if (objDefinition.theme == 'black') {
                        backgroundColor = '#222222';
                    }
                }

                $('#' + id).css('background-color', backgroundColor);

                chartVariable = AmCharts.makeChart(id, objDefinition);
                chartVariable.version = "3";
                
                verifyDataLoaderLength(chartVariable, id, state);
    
                var handleClick = function (data) {
                    internalHandleClick(uniqueId, data, commandName);
                };
    
                chartVariable.addListener("clickGraphItem", handleClick);
                chartVariable.addListener("clickSlice", handleClick);
            }
        },

        getChart: function (id) {
            var chart = _.find(charts, function (chart) { return chart.id == id })
            if (chart != null)
                return JSON.parse(chart.definition);
            else
                return null;
        }
    };
}();

export default AmChartsWidget;
