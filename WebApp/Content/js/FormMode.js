class BaseFormMode {
    getFieldValue(control) {
        switch ($(control).data("type")) {
            case "association": return this.getAssociationFieldValue(control);
            case "aggregation": return this.getAggregationFieldValue(control);
            case "bit": return this.getBitFieldValue(control);
            case "boolean": return this.getBooleanFieldValue(control);
            case "color": return this.getColorFieldValue(control);
            case "currency": return this.getCurrencyFieldValue(control);
            case "date": return this.getDateFieldValue(control);
            case "datetime": return this.getDateTimeFieldValue(control);
            case "hidden": return this.getHiddenFieldValue(control);
            case "integer": return this.getIntegerFieldValue(control);
            case "label": return this.getLabelFieldValue(control);
            case "list": return this.getListFieldValue(control);
            case "number": return this.getNumberFieldValue(control);
            case "radio": return this.getRadioFieldValue(control);
            case "string": return this.getStringFieldValue(control);
            case "tab": return this.getTabFieldValue(control);
            case "text": return this.getTextFieldValue(control);
            case "time": return this.getTimeFieldValue(control);
            default: return "";
        }
    }

    getAssociationFieldValue(value) {
        if (value === null || value === "")
            return null;

        let data = JSON.parse(value);
        if (data.SelectedItems == null || data.SelectedItems[0].id == null || data.SelectedItems[0].id.toString() === "-1")
            return null;

        return data.SelectedItems[0];
    };

    getAggregationFieldValue(values) {
        if (!values || !values.length)
            return null;

        let items = [];
        let data = JSON.parse(values);
        $(data.SelectedItems).each(function () {
            items.push(this);
        });

        if (items.length === 0)
            return null;

        return items;
    };

    getBitFieldValue(control) {
        let items = new Array();
        let checkboxs = $(control).find("input:checked");
        for (let i = 0; i < checkboxs.length; i++) {
            let $checkbox = $(checkboxs[i]);
            items[i] = {
                id: $checkbox.val(),
                text: $checkbox.next().text()
            };
        };

        if (items.length === 0)
            return null;
        return items;
    };

    getColorFieldValue(control) {
        return this.getStringFieldValue(control);
    };

    getCurrencyFieldValue(control) {
        var value = this.getStringFieldValue(control);
        if (value && value.length)
            value = value.replace("R$ ", "").replaceAll(".", "").replace(",", ".");

        return value;
    };

    getDateFieldValue(control) {
        return this.getDateTimeFieldValue(control);
    };

    getIntegerFieldValue(control) {
        var value = this.getStringFieldValue(control);
        if (value && value.length)
            value = value.replaceAll(".", "");

        return value;
    };

    getLabelFieldValue(control) {
        return this.getStringFieldValue(control);
    };

    getNumberFieldValue(control) {
        var value = this.getStringFieldValue(control);
        if (value && value.length)
            value = value.replaceAll(".", "").replace(",", ".");

        return value;
    };

    getTimeFieldValue(control) {
        return this.getStringFieldValue(control);
    };
};

class FormModeReadOnly extends BaseFormMode {

    getAssociationFieldValue(control) {

        return super.getAssociationFieldValue($(control).val());
    };

    getAggregationFieldValue(control) {

        return super.getAggregationFieldValue($(control).val());
    };

    getBooleanFieldValue(control) {
        return $(control).find("input").attr("checked") === "checked" ? 'Sim' : 'Nao';
    };

    getDateTimeFieldValue(control) {
        let cMesAno = 4;
        let cDiaMesAno = 7;
        let chhmm = 5;

        let dataNull = true;
        let horaNull = true;
        let datetime = "";

        let datetimeInputs = $(control).find("input");       
        let hasData = datetimeInputs.length > 0;
        let hasHora = datetimeInputs.length > 1;

        if (hasData) {
            let data = datetimeInputs[0];
            if (data.value.trim().length === data.maxLength) {
                datetime = data.value;
                dataNull = false;
            } else {
                datetime = "31/12/1899";
                if (data.maxLength === cMesAno) {
                    datetime = "1899"
                } else if (data.maxLength === cDiaMesAno) {
                    datetime = "12/1899";
                }
            }

            if (hasHora) {
                let hora = datetimeInputs[1];
                if (hora.value.trim().length === hora.maxLength) {
                    datetime = datetime + " " + hora.value;
                    horaNull = false;
                }
                else {
                    datetime = datetime + " 00:00:00";
                    if (hora.maxLength === chhmm) {
                        datetime = datetime + " 00:00";
                    }
                }
            }
        }

        if (dataNull && horaNull)
            datetime = "";

        return datetime.trim();
    };

    getHiddenFieldValue(control) {
        if ($(control).data("internal-type") === "currency")
            return this.getCurrencyFieldValue(control);
        else if ($(control).data("internal-type") === "number")
            return this.getNumberFieldValue(control);
        else if ($(control).data("internal-type") === "list")
            return this.getListFieldValue(control);
        else if ($(control).data("internal-type") === "association")
            return $(control).find("input").val();
        else if ($(control).data("internal-type") === "aggregation")
            return $(control).find("input").val();
        else if ($(control).data("internal-type") === "boolean")
            return $(control).find("input").val() === "True" ? "Sim" : "Nao";
        else
            return this.getStringFieldValue(control);
    };

    getListFieldValue(control) {
        control = $(control).children();
        if ($(control).is("select")) {
            if ($(control).val() === "-1")
                return null;

            return {
                id: $(control).val(),
                text: $(control).find("option:selected").text()
            };
        }

        if ($(control).attr("key") == "")
            return null;

        return {
            id: $(control).val(),
            text: $(control).attr("key")
        };;
    };

    getRadioFieldValue(control) {
        var checkedOption = control.querySelector("input:checked");
        if (checkedOption !== null) {
            return {
                "id": checkedOption.value,
                "text": $(checkedOption).next().text()
            };
        }
        return null;
    };

    getStringFieldValue(control) {
        return $(control).find("input").val();
    };

    getTabFieldValue(control) {

        var checkOption = $(control).find("input[type='radio'][checked='checked']").first();
        if (checkOption && checkOption.length) {
            return {
                id: $(checkOption).val(),
                text: $(checkOption).next().text()
            };
        }
        return null;
    };

    getTextFieldValue(control) {
        return $(control).find("textarea").val();
    }
};

class FormModeView extends BaseFormMode {

    getAssociationFieldValue(control) {

        return super.getAssociationFieldValue($(control).val());
    };

    getAggregationFieldValue(control) {

        return super.getAggregationFieldValue($(control).val());
    };

    getBooleanFieldValue(control) {
        return control.getAttribute("data-key") === "S" ? 'Sim' : 'Nao';
    };

    getDateTimeFieldValue(control) {
        return this.getStringFieldValue(control);
    };

    getHiddenFieldValue(control) {
        if ($(control).data("internal-type") === "boolean")
            return $(control).find("input").val() === "True" ? "Sim" : "Nao";
        return $(control).find("input").val();
    };

    getListFieldValue(control) {
        if (control.getAttribute("data-key") === null)
            return null;

        return {
            id: control.getAttribute("data-key"),
            text: control.innerText
        };
    };

    getRadioFieldValue(control) {
        if (control.getAttribute("data-key") === null)
            return null;

        return {
            id: control.getAttribute("data-key"),
            text: control.innerText
        };
    };

    getStringFieldValue(control) {
        return control.innerText.trim();
    };

    getTabFieldValue(control) {
        var $tab = $(control).find(".tab-value");
        if ($tab.attr("data-key")) {
            return {
                id: $tab.data("key"),
                text: $tab.text()
            };
        }
        return "";
    };

    getTextFieldValue(control) {
        return this.getStringFieldValue(control);
    }
}

export { FormModeReadOnly, FormModeView };