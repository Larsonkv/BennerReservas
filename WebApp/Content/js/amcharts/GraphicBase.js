import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import am4themes_moonrisekingdom from "@amcharts/amcharts4/themes/moonrisekingdom";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class GraphicBase {

    constructor(uniqueId, commandName) {
        this.uniqueId = uniqueId;
        this.commandName = commandName;
    }

    applyTheme(id, theme) {
        if (theme === "dataviz") {
            am4core.useTheme(am4themes_dataviz);
        } else if (theme === "material") {
            am4core.useTheme(am4themes_material);
        } else if (theme === "kelly") {
            am4core.useTheme(am4themes_kelly);
        } else if (theme === "dark") {
            am4core.useTheme(am4themes_dark);

            let chart = document.getElementById(id);
            chart.style.backgroundColor = "#30303d"; 
            chart.style.color = "#fff";
        } else if (theme === "frozen") {
            am4core.useTheme(am4themes_frozen);
        } else if (theme === "moonrisekingdom)") {
            am4core.useTheme(am4themes_moonrisekingdom);
        } else if (theme === "spiritedaway") {
            am4core.useTheme(am4themes_spiritedaway);
        }
        am4core.useTheme(am4themes_animated);
    }

    unuseAllThemes() {
        am4core.unuseAllThemes();
    }

    getTootipText(balloonText) {
        if (balloonText === "[[category]] : [[value]]")
            return "{categoryX} - {valueY}";
        else if (balloonText === "[[category]]")
            return "{categoryX}";
        else if (balloonText === "[[value]]")
            return "{valueY}";
        else
            return "";
    }

    getLegendText(valueText) {
        if (valueText === "[[value]]")
            return "{value.value}";
        else if (valueText === "[[value]]([[percents]]%)")
            return "{value.value}({value.percent.formatNumber('#.0')}%)";
        else if (valueText === "[[percents]]%")
            return "{value.percent.formatNumber('#.0')}%";
        else 
            return "";
    }

    addLegend(chart, objDefinition) {
        if (objDefinition.legend.enabled) {
            chart.legend = new am4charts.Legend();
            chart.legend.position = objDefinition.legend.position;
            chart.legend.valueLabels.template.text = this.getLegendText(objDefinition.legend.valueText);
        }
    }

    createCircleBullet(serie, fillColors, commandName) {
        let circleBullet = serie.bullets.push(new am4charts.CircleBullet());
        circleBullet.strokeWidth = 3;
        circleBullet.circle.radius = 4;
        if (fillColors) {
            circleBullet.fill = am4core.color(fillColors);
        }

        circleBullet.events.on("hit", this.handleClick, this);

        return circleBullet;
    }

    createLabelBullet(serie, graphs) {
        let labelText = this.getTootipText(graphs.labelText);
        if (labelText !== "") {
            let labelBullet = serie.bullets.push(new am4charts.LabelBullet());
            labelBullet.dy = -15;
            labelBullet.label.text = labelText;
        }
    }

    handleClick(ev) {
        let entity = ev.target.dataItem._dataContext;
        if (entity == null) {
            entity = ev.target.dataItem.component.tooltipDataItem.dataContext;
        }
        GraphicBase.validateDatetimeField(entity);
        let entityJson = JSON.stringify(entity);
        let parameter = this.commandName + "$" + entity.id + "$" + entityJson;

        __doPostBack(this.uniqueId, parameter);
    }

    static validateDatetimeField(entity) {
        _.filter(entity, (value, key, entity) => {
            //significa que e um campo data - EntityBase, L. 1053
            if (key.endsWith(".toui")) {
                var orginalFieldDate = key.replace(".toui", "");
                entity[orginalFieldDate] = value;
            }
        });
    }

    callHandleClick(serie) {
        if (serie.columns != null) {
            serie.columns.template.events.on("hit", this.handleClick, this);
        }
        else if (serie.slices != null) {
            serie.slices.template.events.on("hit", this.handleClick, this);
        }
        else if (serie.segments != null) {
            serie.segments.template.interactionsEnabled = true;
            serie.segments.template.events.on("hit", this.handleClick, this);
        }
    }

    customGraphicSerie(graphs, serie, valueAxis) {
        if (graphs.code != undefined) {

            var funcBody = graphs.code.match(/function[^{]+\{([\s\S]*)\}$/)[1];
            var funcCustomization = new Function(['serie', 'valueAxis'], funcBody);

            funcCustomization.apply(undefined, [serie, valueAxis]);
        }
    }

    customGraphic(chart, code) {
        if (code != undefined) {

            var funcBody = code.match(/function[^{]+\{([\s\S]*)\}$/)[1];
            var funcCustomization = new Function(['chart'], funcBody);

            funcCustomization.apply(undefined, [chart]);
        }
    }
}

export default GraphicBase;