import GraphicBase from './GraphicBase';

class GraphicPie extends GraphicBase {
    
    constructor(uniqueId, commandName) {
        super(uniqueId, commandName);
    }

    getChart(id, objDefinition) {
        let pieSeries;
        let chart;

        super.applyTheme(id, objDefinition.theme4);
        if (objDefinition.depth3D) {
            chart = am4core.create(id, am4charts.PieChart3D);
            pieSeries = chart.series.push(new am4charts.PieSeries3D());
        } else {
            chart = am4core.create(id, am4charts.PieChart);
            pieSeries = chart.series.push(new am4charts.PieSeries());
        }
        
        pieSeries.dataFields.value = objDefinition.valueField;
        pieSeries.dataFields.category = objDefinition.titleField;
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        if (this.commandName) {
            pieSeries.slices.template.events.on("hit", super.handleClick, this);
        }

        if (objDefinition.innerRadius === "40%") {
            chart.innerRadius = am4core.percent(30);
        }

        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        pieSeries.labels.template.text = this.getTootipTextPie(objDefinition.labelText);

        super.addLegend(chart, objDefinition);

        chart.exporting.menu = new am4core.ExportMenu();
        super.callHandleClick(pieSeries);
        super.customGraphic(chart, objDefinition.code);
        super.unuseAllThemes();

        return chart;
    }

    getTootipTextPie(balloonText) {
        if (balloonText === "[[title]]: [[value]]([[percents]]%)")
            return "{category}: {value}({value.percent.formatNumber('#.0')}%)";
        else if (balloonText === "[[title]]: [[value]]")
            return "{category}: {value}";
        else if (balloonText === "[[title]]: [[percents]]%")
            return "{category}: {value.percent.formatNumber('#.0')}%";
        else if (balloonText === "[[title]]")
            return "{category}";
        else if (balloonText === "[[value]]")
            return "{value}";
        else if (balloonText === "[[percents]]%")
            return "{value.percent.formatNumber('#.0')}%";
        else
            return "";
    }
}

export default GraphicPie;