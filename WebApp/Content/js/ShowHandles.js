import {FormModeReadOnly} from './FormMode';

var ShowHandles = {
};

ShowHandles.form = function () {
    if (ShowHandles.isActivatedShowHandle() === false) return;

    var widgets = Benner.Page.widgets.filter(function (x) {
        return x.widgetType === "AjaxForm";
    });
    $(widgets).each(function (index, item) {
        if (ShowHandles.isShowing($(item))) {
            return;
        }

        var handlefield = item.field('HANDLE');
        var widgetBody = $(item.el()).find(".widget-body");

        if (handlefield === "-1" || handlefield.length === 0) {
            widgetBody.siblings().remove();
            return;
        }
        var spanHandle = $('<label class="btn btn-sm active"> </label>').text('HANDLE: ' + handlefield).addClass('bold').css({ 'background-color': '#e0ebf9' });
        widgetBody.siblings().remove();
        widgetBody.first().before(spanHandle);
    });
};

ShowHandles.removeHandleForm = function () {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    var widgets = Benner.Page.widgets.filter(function (x) {
        return x.widgetType === "AjaxForm";
    });
    $(widgets).each(function (index, item) {
        $(item.el()).find(".widget-body").siblings().remove();
    });
};

ShowHandles.grid = function () {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    $("tr[handle]").each(function () {
        if (ShowHandles.isShowing($(this))) {
            return;
        }

        var handle = $(this).attr('handle');
        var table = $(this).closest('table');
        var bodyTd = $('<td></td>').text(handle).addClass('info');
        $(this).find('td:first').before(bodyTd);

        if (!ShowHandles.isShowing(table)) {
            var headerTd = $('<td></td>').text('HANDLE').addClass('info bold').css({ 'width': '70px' });
            table.find('th').eq($(bodyTd).index()).before(headerTd);

            ShowHandles.resolveTotalizers(table);
        }
    });
};

ShowHandles.resolveTotalizers = function (table) {
    if (table[0]) {
        if (table[0].rows.length > 0) {
            var rowTotalizer = table[0].rows[table[0].rows.length - 1]
            if (rowTotalizer.attributes.class) {
                if (rowTotalizer.attributes.class.value === "totalizer-row") {
                    $(table).find(".totalizer-row").find("td").first().attr("colspan", "2");
                }
            }
        }
    }
};

ShowHandles.addHandleGridEditable = function () {
    if (!ShowHandles.isActivatedShowHandle()) {
        return;
    }

    var firstTr = $("tr[handle]").first().before(bodyTd);
    var table = $(firstTr).closest('table');
    var bodyTd = $('<td></td>').text("?").addClass('info');
    $(this).find('td:first').before(bodyTd);
    var headerTd = $('<td></td>').text('HANDLE').addClass('info bold').css({ 'width': '70px' });
    table.find('th').eq($(bodyTd).index()).before(headerTd);
};

ShowHandles.changeSpanFieldAssociation = function (text, field, removeSpan) {
    if (text == undefined) { 
        return;
    }

    var spanHandles = $('<label class="btn btn-default"></label>').text(text)
        .addClass('bold').css({ 'background-color': '#e0ebf9' });
    var span = $(field).parent().siblings('.input-group-btn');
    if (removeSpan) {
        span.children('label').remove();
    }

    span.append(spanHandles);
};

ShowHandles.fieldAssociationUpdate = function (fieldName) {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    var fieldsAssociation = $("input[data-type='association']");
    for (var i = 0; i < fieldsAssociation.length; i++) {
        var campo = fieldsAssociation[i];
        if (campo.dataset["field"] === fieldName) {
            var fieldId = "?";
            if (campo.value.length !== 0) {
                var formMode = new FormModeReadOnly();
                var associationFieldValue = formMode.getAssociationFieldValue(campo);
                if (associationFieldValue !== null) {
                    fieldId = associationFieldValue.id;
                }
            }

            ShowHandles.changeSpanFieldAssociation(fieldId, campo, true)
        }
    }
};

ShowHandles.changeSpanFieldAggregation = function (value, spanField, removeSpan) {
    var handlesField = "";
    if (value != null) {
        handlesField = value.reduce(function (acc, cur) {
            if (acc !== '') {
                acc += ", ";
            }
            acc += cur.id;
            return acc;
        }, '');
    }

    if (handlesField === "") {
        handlesField = "?";
    }

    var spanHandles = $('<label class="btn btn-default"></label>').text(handlesField)
        .addClass('bold').css({ 'background-color': '#e0ebf9' });
    var span = $(spanField).parent().siblings('.input-group-btn');
    if (removeSpan) {
        span.children('label').remove();
    }

    span.append(spanHandles);
};

ShowHandles.fieldAggregationUpdate = function (fieldName) {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    var fieldsAggregation = $("input[data-type='aggregation']");
    for (var i = 0; i < fieldsAggregation.length; i++) {
        var campo = fieldsAggregation[i];
        if (campo.dataset["field"] === fieldName) {
            var widgetId = $(campo).closest(".widget").attr("id");
            var widgets = Benner.Page.widgets.filter(function (x) {
                return x.id === widgetId;
            });

            if (widgets.length > 0) {
                var widgetObj = widgets[0];
                var value;
                if (widgetObj.widgetType === "AjaxForm") {
                    value = widgetObj.field(fieldName);
                    ShowHandles.changeSpanFieldAggregation(value, campo, true);
                } else if (widgetObj.widgetType === "FilterWidget" || widgetObj.widgetType === "EditableGrid") {
                    value = ShowHandles.getAggregationValueFromFilterWidgetAndEditableGrid(widgetObj, fieldName);
                    ShowHandles.changeSpanFieldAggregation(value, campo, true);
                } else if (widgetObj.widgetType === "SimpleGrid") {
                    let fields = widgetObj.filterFields();
                    value = fields[fieldName.toLowerCase()];
                    ShowHandles.changeSpanFieldAggregation(value, campo, true);
                }
            }
        }
    }
};

ShowHandles.valueChangedLookup = function (fieldName) {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }
    ShowHandles.fieldAggregationUpdate(fieldName);
    ShowHandles.fieldAssociationUpdate(fieldName);
};

ShowHandles.loadGridEditableWithLookup = function (associationField) {
    var field = associationField.value;
    var fieldValueJson = $.parseJSON(field);
    var fieldValueSelectedItems = fieldValueJson.SelectedItems;
    var fieldId = "?";
    if (fieldValueSelectedItems != null) {
        fieldId = fieldValueSelectedItems[0].id;
    }

    if (fieldId === -1) {
        fieldId = "?";
    }

    ShowHandles.changeSpanFieldAssociation(fieldId, associationField, false);
};

ShowHandles.loadAssociationField = function () {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    $("input[data-type='association']").each(function () {

        if (ShowHandles.isShowing($(this))) {
            return;
        }

        var widgetId = $(this).closest(".widget").attr("id");
        var widgets = Benner.Page.widgets.filter(function (x) {
            return x.id === widgetId;
        });

        if (widgets.length > 0) {
            var widgetObj = widgets[0];
            if (ShowHandles.isWidgetTypesValid(widgetObj.widgetType)) {
                if (widgetObj.widgetType === "AjaxForm") {
                    var handle = "?";
                    var campo = $(this).attr('data-field');
                    if (widgetObj.field != undefined) {
                        var value = widgetObj.field(campo);
                        if (value != null) {
                            handle = value.id;
                        }
                    }

                    ShowHandles.changeSpanFieldAssociation(handle, this, true);
                }
                else {
                    ShowHandles.loadGridEditableWithLookup(this);
                }
            }
        }
    });
};

ShowHandles.loadAggregationField = function () {
    $("input[data-type='aggregation']").each(function (index, obj) {

        if (typeof obj !== "undefined" && obj !== null && obj.value !== null && obj.value !== "") {
            if (ShowHandles.isShowing($(obj))) {
                return;
            }

            var widgetId = $(this).closest(".widget").attr("id");
            var widgets = Benner.Page.widgets.filter(function (x) { return x.id === widgetId; });

            if (widgets.length > 0) {
                var widgetObj = widgets[0];
                var campo = $(this).attr('data-field');

                var value;
                if (widgetObj.widgetType === "AjaxForm") {
                    value = widgetObj.field(campo);
                    ShowHandles.changeSpanFieldAggregation(value, this, false);
                } else if (widgetObj.widgetType === "FilterWidget" || widgetObj.widgetType === "EditableGrid") {
                    value = ShowHandles.getAggregationValueFromFilterWidgetAndEditableGrid(widgetObj, campo);
                    ShowHandles.changeSpanFieldAggregation(value, this, false);
                } else if (widgetObj.widgetType === "SimpleGrid") {
                    var fields = widgetObj.filterFields();
                    value = fields[campo.toLowerCase()];
                    ShowHandles.changeSpanFieldAggregation(value, this, false);
                }
            }
        }
    });
};

ShowHandles.loadLookup = function () {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    ShowHandles.loadAssociationField();
    ShowHandles.loadAggregationField();
};

ShowHandles.allHandles = function () {
    if (ShowHandles.isActivatedShowHandle() === false) {
        return;
    }

    ShowHandles.grid();
    ShowHandles.form();
    ShowHandles.loadLookup();
};

ShowHandles.isShowing = function (e) {
    if ($(e).attr('showmethehandles') === 'S') {
        return true;
    }

    $(e).attr('showmethehandles', 'S');
    return false;
};

ShowHandles.setLocalStorage = function () {
    toastr.options.timeOut = 2000;
    toastr.options.onHidden = function () {
        window.location.reload(true);
    };

    if (ShowHandles.getLocalStorage() === "false" || ShowHandles.getLocalStorage() == null) {
        localStorage.setItem("ShowMeTheHandle", "true");
    } else {
        localStorage.setItem("ShowMeTheHandle", "false");
    }

    if (ShowHandles.getLocalStorage() === "true") {
        toastr.success("ShoMeTheHandle ativado!");
    } else {
        toastr.success("ShoMeTheHandle desativado!");
    }
};

ShowHandles.getLocalStorage = function () {
    return localStorage.getItem("ShowMeTheHandle");
};

ShowHandles.isActivatedShowHandle = function () {
    if (ShowHandles.getLocalStorage() === "false" || ShowHandles.getLocalStorage() == null) {
        return false;
    }
    return true;
};

ShowHandles.isWidgetTypesValid = function (widgetType) {
    if (widgetType === "EditableGrid" ||
        widgetType === "SimpleGrid" ||
        widgetType === "AjaxForm" ||
        widgetType === "FilterWidget") {
        return true;
    }

    return false;
};

ShowHandles.getAggregationValueFromFilterWidgetAndEditableGrid = function (widgetObj, fieldName) {
    let filterWidgetForm = $('.filter-search-form', widgetObj.el());
    let fields = (Benner.Form.getFields(filterWidgetForm, new FormModeReadOnly()));

    return fields[fieldName.toLowerCase()];
}

export default ShowHandles;
