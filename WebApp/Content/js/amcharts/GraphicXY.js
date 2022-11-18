import GraphicBase from './GraphicBase';

class GraphicXY extends GraphicBase {
    
    constructor(uniqueId, commandName) {
        super(uniqueId, commandName);
    }

    initializeSerieColumn(chart, objDefinition, graphs) {
        let columnSeries = chart.series.push(objDefinition.depth3D ? new am4charts.ColumnSeries3D() : new am4charts.ColumnSeries());
        columnSeries.name = graphs.title;

        if (this.isStackType(objDefinition)) {
            columnSeries.stacked = true;
        }

        columnSeries.sequencedInterpolation = true;
        columnSeries.tooltip.pointerOrientation = "vertical";
        
        columnSeries.columns.template.column.fillOpacity = 0.8;
        columnSeries.columns.template.strokeOpacity = 0;

        if (this.commandName) {
            columnSeries.columns.template.events.on("hit", super.handleClick, this);
        }

        if (graphs.fillColors) {
            columnSeries.fill = am4core.color(graphs.fillColors);
        } else if (objDefinition.graphs.length === 1) {
            columnSeries.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });
        }

        return columnSeries;
    }

    createSerieBar(chart, objDefinition, graphs) {
        let barSeries = this.initializeSerieColumn(chart, objDefinition, graphs);

        barSeries.dataFields.categoryY = objDefinition.categoryField;
        barSeries.dataFields.valueX = graphs.valueField;

        barSeries.columns.template.tooltipText = this.getTootipTextBar(graphs.balloonText);

        let labelText = this.getTootipTextBar(graphs.labelText);
        if (labelText !== "") {
            let labelBullet = barSeries.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = labelText;
            labelBullet.label.horizontalCenter = "left";
            labelBullet.label.dx = 10;
            labelBullet.locationX = 1
        }

        return barSeries;
    }

    createSerieColumn(chart, objDefinition, graphs) {
        let columnSeries = this.initializeSerieColumn(chart, objDefinition, graphs);
        
        columnSeries.dataFields.categoryX = objDefinition.categoryField;
        columnSeries.dataFields.valueY = graphs.valueField;

        columnSeries.columns.template.tooltipText = super.getTootipText(graphs.balloonText);

        let labelText = super.getTootipText(graphs.labelText);
        if (labelText !== "") {
            let labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet());
            labelBullet.label.text = labelText;

            labelBullet.dy = 15;
        }
        
        return columnSeries;
    }

    createSerieLine(chart, objDefinition, graphs) {
        let lineSeries = chart.series.push(new am4charts.LineSeries());
        
        if (this.isStackType(objDefinition)) {
            lineSeries.stacked = true;
        }

        lineSeries.name = graphs.title;

        lineSeries.dataFields.categoryX = objDefinition.categoryField;
        lineSeries.dataFields.valueY = graphs.valueField;
        lineSeries.tooltipText = super.getTootipText(graphs.balloonText);

        lineSeries.tooltip.background.cornerRadius = 20;
        lineSeries.tooltip.background.strokeOpacity = 0;
        lineSeries.tooltip.pointerOrientation = "vertical";
        lineSeries.tooltip.label.minWidth = 40;
        lineSeries.tooltip.label.minHeight = 40;
        lineSeries.tooltip.label.textAlign = "middle";
        lineSeries.tooltip.label.textValign = "middle";
        lineSeries.tensionX = 0.8;
        lineSeries.strokeWidth = 3;

        if (graphs.fillAlphas) {
            lineSeries.fillOpacity = graphs.fillAlphas;
        }

        if (graphs.fillColors) {
            lineSeries.stroke = am4core.color(graphs.fillColors);
            lineSeries.fill = am4core.color(graphs.fillColors);
        }

        super.createCircleBullet(lineSeries, "#fff", this.commandName);
        
        super.createLabelBullet(lineSeries, graphs.labelText);
        
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.opacity = 0;
        chart.cursor.lineY.opacity = 0;

        return lineSeries;
    }

    getChart(id, objDefinition) {
        super.applyTheme(id, objDefinition.theme4);

        var chart = am4core.create(id, am4charts.XYChart);
        chart.exporting.menu = new am4core.ExportMenu();
            
        let categoryAxis = (objDefinition.rotate) ? chart.yAxes.push(new am4charts.CategoryAxis()) : chart.xAxes.push(new am4charts.CategoryAxis());
        
        categoryAxis.dataFields.category = objDefinition.categoryField;
        categoryAxis.renderer.minGridDistance = 15;
        
        let valueAxis = objDefinition.rotate ? chart.xAxes.push(new am4charts.ValueAxis()) : chart.yAxes.push(new am4charts.ValueAxis());
            
        if (objDefinition.valueAxes && objDefinition.valueAxes[0].title) {
            valueAxis.title.text = objDefinition.valueAxes[0].title;
        }

        let lastColumnIndex = _.findLastIndex(objDefinition.graphs, function (graphs) {
            if (graphs.type == "column") {
                return graphs;
            }
        });

        for (let index in objDefinition.graphs) {

            let serie = null;
            let graphs = objDefinition.graphs[index];
            if (graphs.type === "column" && objDefinition.rotate) {

                serie = this.createSerieBar(chart, objDefinition, graphs);
            } else if (graphs.type === "column") {
                serie = this.createSerieColumn(chart, objDefinition, graphs);
            } else if (graphs.type === "line") {

                serie = this.createSerieLine(chart, objDefinition, graphs);
            }

            //Quando o gráfico tem series de barra(s) ou coluna(s) deve arrendondar as pontas.
            //Se as series forem empilhadas (StackType), só deve arrendondar a última serie.
            if ((this.isStackType(objDefinition) && lastColumnIndex == index) || 
                (!this.isStackType(objDefinition) && graphs.type === "column")) {
                this.setCornerRadiusInColumnSerie(serie, objDefinition.rotate);
            }

            super.customGraphicSerie(graphs, serie, valueAxis);
            super.callHandleClick(serie);
        }

        super.addLegend(chart, objDefinition);

        if (objDefinition.categoryAxis && objDefinition.categoryAxis.labelRotation) {
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 310;
        }

        super.customGraphic(chart, objDefinition.code);
        super.unuseAllThemes();

        return chart;
    }

    getTootipTextBar(balloonText) {
        if (balloonText === "[[category]] : [[value]]")
            return "{categoryY} - {valueX}";
        else if (balloonText === "[[category]]")
            return "{categoryY}";
        else if (balloonText === "[[value]]")
            return "{valueX}";
        else
            return ""
    }

    //Checkbox da propriedade Empilhar séries.
    isStackType(objDefinition) {
        return objDefinition.valueAxes && objDefinition.valueAxes[0].stackType == "regular";
    }

    //Atribui os cantos arrendodados nos gráficos de coluna e barra.
    setCornerRadiusInColumnSerie(serie, isBar) {
        if (isBar) {
            serie.columns.template.column.cornerRadiusBottomRight = 10;
            serie.columns.template.column.cornerRadiusTopRight = 10;
        }
        else {
            serie.columns.template.column.cornerRadiusTopLeft = 10;
            serie.columns.template.column.cornerRadiusTopRight = 10;
        }
        
        return serie;
    }
}

export default GraphicXY;