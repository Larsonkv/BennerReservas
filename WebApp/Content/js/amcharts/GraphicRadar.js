import GraphicBase from './GraphicBase';

class GraphicRadar extends GraphicBase {

    constructor(uniqueId, commandName) {
        super();

        this.uniqueId = uniqueId;
        this.commandName = commandName;
    }

    getChart(id, objDefinition) {

        super.applyTheme(id, objDefinition.theme4);

        let chart = am4core.create(id, am4charts.RadarChart);
        chart.exporting.menu = new am4core.ExportMenu();

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = objDefinition.categoryField;

        for (let index in objDefinition.graphs) {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(index);
            valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

            let graphs = objDefinition.graphs[index];

            var radarSeries = chart.series.push(new am4charts.RadarSeries());
            radarSeries.name = graphs.title;
            radarSeries.dataFields.valueY = graphs.valueField;
            radarSeries.dataFields.categoryX = objDefinition.categoryField;
            radarSeries.strokeWidth = 3;
            radarSeries.tooltipText = super.getTootipText(graphs.balloonText);
            if (graphs.fillColors) {
                radarSeries.stroke = am4core.color(graphs.fillColors);
                radarSeries.fill = am4core.color(graphs.fillColors);
            }
            
            if (graphs.type === "line" && graphs.fillAlphas) {
                radarSeries.fillOpacity = graphs.fillAlphas;
            }

            super.createCircleBullet(radarSeries, graphs.fillColors, this.commandName);
            
            super.createLabelBullet(radarSeries, graphs.labelText);
            
            chart.cursor = new am4charts.RadarCursor(); 

            super.customGraphicSerie(graphs, radarSeries, valueAxis);
        }

        super.addLegend(chart, objDefinition);
        super.callHandleClick(radarSeries);
        super.customGraphic(chart, objDefinition.code);
        super.unuseAllThemes();

        return chart;
    }
}

export default GraphicRadar;