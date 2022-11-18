import Control from './Control';
import Form from './Form';
import { FormModeReadOnly } from './FormMode';
import MessagePanel from './MessagePanel';

var Grid = function () {

};

Grid.extend = function (widget) {
    let hasFilter = $(widget.el()).find(".filter-search-form");

    return Object.extend(widget, {
        hasFilter: hasFilter,
        filterFields: function () {
            var form = $(widget.el()).find(".filter-search-form");
            return Form.getFields(form, new FormModeReadOnly());
        },
		select: function (row) {
			let sender = $(`#${this.id} table tr[rel="${row}"] td:not(.column-action):not(.multi-select-column):not(.info):first`);
			sender.click();
        },
        getSelected: function () {
            var self = this;
            var result = {};
            $("#" + this.name).find("tr").each(function () {
                if ($(this).hasClass("active")) {
                    var currentHandle = $(this).attr("handle");
                    result = _.find(self.toJson(), p => {
                        return p.handle === currentHandle;
                    });
                }
            });
            return result;
        },
        filter: function (search) {
            if (search) {
                $(this.el()).find('.filter-simple-search input').val(search);
            }
            __doPostBack(this.uniqueid + '$SearchButton', '');
        },
        new: function () {
            this.command("New");
        },
        next: function () {
            __doPostBack(this.currentNodeId + '$btNextPage', '');
        },
        back: function () {
            __doPostBack(this.currentNodeId + '$btPreviousPage', '');
        },
        defineColumns: function (columns) {
            if (columns)
                this.command("UserCustomFields$" + columns.join("|"));
            else
                this.command("UserCustomFields");
        },
        columns: function () {
            let columns = [];
            $(this.el()).find('th[data-field]').each(function () {
                columns.push($(this).data("field"));
            });
            return columns;
        },
        toJson: function () {
            var model = [];
            var result = [];
            parseGridHeader(model, this.name);
            parseGridContent(model, this.name, result);
            return result;
		},
		check: function (row) {
			let sender = $(`#${this.id} table tr[rel='${row}'] span`);
			sender.click();
		},
		checkAll: function (justThisPage) {
			if (justThisPage) 
				$(`#${this.id} table thead .multi-select-column input`)[0].click();
			else 
				Benner.Grid.selectAll(this.uniqueid)
			
		},
		allRowWasCheckedInPage: false
    });
};

function parseGridHeader(model, name) {
    $("#" + name).find("thead").each(function () {
        $(this).find("th").each(function () {
            var apiField = $(this).attr("data-field");
            if (apiField !== undefined) {
                model.push(apiField);
            }
        });
    });
}

function parseGridContent(model, name, result) {
    $("#" + name).find("tr:not(.totalizer-row)").each(function () {
        var r = {};
        var i = 0;

        $(this).find("td").each(function () {
            if ($(this).attr("data-type") == "boolean") {
                r[model[i++]] = $(this).find("input").prop("checked");
            } else if ($(this).attr("data-field") !== undefined) {
                r[model[i++]] = $(this).text();
            } else {
                $(this).find("span").each(function () {
                    if ($(this).attr("data-type") === "image") {
                        $(this).find("a").each(function () {
                            var link = $(this).attr("href");
                            r[model[i++]] = window.location.origin + link;
                        });
                    }
                });
            }
        });
        if (!$.isEmptyObject(r)) {
            r["handle"] = $(this).attr("handle");
            result.push(r);
        }
    });
}

$(document).keyup(function (e) {
    if (e.keyCode == 13) { // enter
        var $currentFocus = $('input[type=text]:focus,input[type=checkbox]:focus,span:focus,input[type=search]:focus');
        if ($currentFocus.length) {
            var $filterForm = $currentFocus.closest('.filter-search-form, .filter-search-simple');
            if ($filterForm.length) {

                //o enter pode ter sido disparado pela seleção de campo filtro ou tabela. Neste caso o campo filtro configurado para pesquisar ao pressionar enter, não deve executar a pesquisa do filtro.
                let select2 = $currentFocus.closest('.selection').parent().siblings(".benner-search");
                if (select2 && select2.is("[multiple]") && select2.is("[data-searchonenter='true']")) {
                    return;
                }

                var $comboDropDown = $('.comboDropDown');
                if ($comboDropDown.length == 0 || ($comboDropDown.length && !$comboDropDown.is(':visible'))) {
                    var $button = $filterForm.find($('.filter-button'));
                    if ($button.length) {
                        Control.storeCurrentFocus($currentFocus, 'same');

                        // o onclick do botão filtrar é responsável por armazenar o foco no próximo campo
                        var click = $button.attr('onclick');
                        if (click && click.length)
                            eval(click);
                        // enquanto o href é responsável pelo postback
                        window.location.href = $button.attr('href');
                        return false;
                    }
                }
            }
        }
    }
});

Grid.showRecordCommands = function (listItem) {
    var dropMenu = listItem.getElementsByTagName("div");

    if (dropMenu == null || dropMenu.length == 0)
        return;


    dropMenu[0].style.left = "0px"; // Define posicionamento dos comandos logo abaixo do botão 
    dropMenu[0].style.visibility = "visible";
};

Grid.selectAllRows = function (widgetId, widgetClientId, isSimpleGrid) {
	var value = false;
	
	MessagePanel.clear($(`#${widgetId} .multi-select-message`));

	var checkboxlist = $(`#${widgetClientId} td.multi-select-column label > input:enabled`);

	if ($(`#${widgetClientId} th.multi-select-column input:checked`).length > 0) {
		value = true;

		_.forEach(checkboxlist, (option) => {
			if ($(option).prop("checked") !== value) {
				$(option).prop("checked", value);
				this.selectRow(widgetId, widgetClientId, $(option), isSimpleGrid);
			}
		})

	} else {
		$(checkboxlist).prop("checked", false);
		$(checkboxlist).parents("tr").removeClass("active");
		$(`#SelectHandlesInput_${widgetId}`).val('');
		if (this.isCustomLookup())
			Benner.Apps.CustomLookup.cleanSelectionOnTargetControl();

		if (Grid[widgetId] && Grid[widgetId].refreshOnSelectRows)
			Grid[widgetId].refresh();
	}

    this.updateTotalizersAll(widgetClientId, value, isSimpleGrid, widgetId);
};

Grid.stopPropagation = function (evt) {
    var event = evt || window.event;

    if (event.stopPropagation)
        event.stopPropagation();
    else
        event.cancelBubble = true;
};

var AggregateOperationOption = { Count: "Count", Sum: "Sum", Average: "Average", Max: "Max", Min: "Min" };

Grid.initializeTotalizers = function (widgetClientId, isSimpleGrid, isSelectedAllRows, widgetId) {
    Grid.updateTotalizerRow(widgetClientId, isSimpleGrid, isSelectedAllRows, widgetId, null);
};

Grid.getTotalizers = function (columnTotalizers, widgetId) {
    var totalizerInputValues = Grid.getTotalizerInputValues(widgetId);
    if (totalizerInputValues) {
        return totalizerInputValues;
    }

    let array = new Array();
    for (let i = 0; i < columnTotalizers.length; i++) {
        let columnTotalizer = columnTotalizers[i];

        let value = 0;
        if (columnTotalizer.dataset.totalizer === AggregateOperationOption.Max) {
            value = Number.MIN_SAFE_INTEGER;
        } else if (columnTotalizer.dataset.totalizer === AggregateOperationOption.Min) {
            value = Number.MAX_SAFE_INTEGER;
        }

        var totalizerObj = {
            aggregateOperation: columnTotalizer.dataset.totalizer,
            count: 0,
            decimal: columnTotalizer.dataset.mDec,
            name: columnTotalizer.dataset.field,
            type: columnTotalizer.dataset.type,
            value: value
        };

        if (columnTotalizer.dataset.totalizer === AggregateOperationOption.Max || columnTotalizer.dataset.totalizer === AggregateOperationOption.Min) {
            totalizerObj["historyValues"] = [];
            totalizerObj["rowHandles"] = [];
        }

        array.push(totalizerObj);
    }

    return array;
};

Grid.loadDataTotalizers = function (widgetClientId, totalizers, isSimpleGrid, widgetId, selectedHandle) {
    let rows = Array.from(document.querySelectorAll("#" + widgetClientId + " tbody > tr.active.checked"));
    let selectedRow = document.querySelector(`#${widgetClientId} tbody > tr[handle='${selectedHandle}']`);
    if (rows && selectedHandle) {
        let containsSelectedRow = false;
        rows.forEach((row) => {
            if (row.attributes.class.value !== "totalizer-row active" && row.attributes.handle.value == selectedRow.attributes.handle.value) {
                containsSelectedRow = true;
            }
        });
        if (!containsSelectedRow) {
            rows.splice(0, 0, selectedRow);
        }
    }

    let selectedHandlesInput = $('#SelectHandlesInput_' + widgetId);
    let selectedHandlesList = this.inputHiddenToList(selectedHandlesInput);
    for (let i = 0; i < rows.length; i++) {

        if (rows && rows[i].attributes.class.value != "totalizer-row active") {
            let columns = rows[i].querySelectorAll("td.item-totalizer");
            let rowHandle = rows[i].attributes.handle.value;
            let isAddValue = selectedHandlesList.indexOf(rowHandle) == -1;
            let isRemoveValue = !isAddValue && rowHandle == selectedHandle;
            for (let j = 0; j < columns.length; j++) {
                let totalizer = totalizers[j];
                let needAddHandle = (totalizer.aggregateOperation == AggregateOperationOption.Min || totalizer.aggregateOperation == AggregateOperationOption.Max)
                                    && totalizer.rowHandles.indexOf(rowHandle) == -1;
                if (isAddValue || isRemoveValue || needAddHandle) {
                    let value = Grid.getFieldValue(columns[j], isSimpleGrid);
                    Grid.applyTotalizer(totalizer, value, isAddValue, isRemoveValue, rowHandle);
                }
            }
        }
    }
    this.setTotalizerInputValues(totalizers, widgetId);
};

Grid.getTotalizerInput = function (widgetId) {
    return $("#RowsTotalizerInput_" + widgetId);
}

Grid.getTotalizerInputValues = function (widgetId) {
    var totalizerInput = Grid.getTotalizerInput(widgetId);
    var totalizerInputValues = totalizerInput.val();
    if (totalizerInputValues) {
        totalizerInputValues = JSON.parse(totalizerInputValues);
    }
    return totalizerInputValues;
}

Grid.setTotalizerInputValues = function (value, widgetId) {
    var totalizerInput = this.getTotalizerInput(widgetId);
    totalizerInput.val(JSON.stringify(value));
}

Grid.updateTotalizer = function (columnTotalizers, totalizers) {
    for (let i = 0; i < columnTotalizers.length; i++) {
        let columnTotalizer = columnTotalizers[i];
        let totalizerValue = totalizers[i];
        if (totalizerValue.aggregateOperation == AggregateOperationOption.Average && totalizerValue.value > 0) {
            totalizerValue.value = totalizerValue.value / totalizerValue.count;
        }
        columnTotalizer.textContent = Grid.getFormatValue(totalizerValue.value, totalizerValue.type, totalizerValue.decimal);
    }

    columnTotalizers[0].parentNode.classList.add("active");
};

Grid.updateTotalizersAll = function (widgetClientId, selectChecked, isSimpleGrid, widgetId) {
    let columnTotalizers = document.querySelectorAll("#" + widgetClientId + " .totalizer-row > .totalizer-cell");

    if (selectChecked) {
        let totalizers = this.getTotalizers(columnTotalizers, widgetId);

        this.loadDataTotalizers(widgetClientId, totalizers, isSimpleGrid, widgetId);
        if (document.querySelectorAll("#" + widgetClientId + " .totalizer-row").length > 0) {
            this.updateTotalizer(columnTotalizers, totalizers);
        }

    } else {
        for (let i = 0; i < columnTotalizers.length; i++) {
            let columnTotalizer = columnTotalizers[i];
            columnTotalizer.textContent = columnTotalizer.dataset.valueDb;
        }
        if (columnTotalizers.length > 0) {
            columnTotalizers[0].parentNode.classList.remove("active");
        }
        Grid.setTotalizerInputValues("", widgetId);
    }
};

Grid.selectRow = function (widgetId, widgetClientId, sender, isSimpleGrid) {
	//Se for multiplaseleção;
    var handle, text;
	if ($(sender).is('input')) {
        handle = $(sender).parents('tr').attr('handle');
		text = $(sender).parents('tr').attr('text');
	} else {
        handle = $(sender).attr('handle');
		text = $(sender).attr('text');
    }

	this.updateCheckboxInHeader(widgetId);
    this.updateCheckboxValue($(sender));

    this.updateTotalizerRow(widgetClientId, isSimpleGrid, false, widgetId, handle);
    this.updateSelectHandlesInput(handle, widgetId);

    if (this.isCustomLookup()) {
        Benner.Apps.CustomLookup.applySelectionAndHideDialog(handle, text);
        return;
    }

	if (Grid[widgetId] && Grid[widgetId].refreshOnSelectRows)
		Grid[widgetId].refresh();

};

Grid.updateSelectHandlesInput = function (handle, widgetId) {
	let selectedHandlesInput = $('#SelectHandlesInput_' + widgetId);
	let selectedHandlesList = this.inputHiddenToList(selectedHandlesInput);

	if (selectedHandlesList.indexOf(handle) >= 0)
		selectedHandlesList.splice(selectedHandlesList.indexOf(handle), 1);
	else {
		selectedHandlesList.push(handle);
	}

    selectedHandlesInput.val(selectedHandlesList.join('|'));

	this.showMessageSelectedRows(selectedHandlesList, widgetId);
};

Grid.customizeColumns = function (idWidget) {
    if (!Grid[idWidget] || !Grid[idWidget].customizedColumns)
        return;

    let customizedColumns = JSON.parse(Grid[idWidget].customizedColumns);
    let columns = Grid[idWidget].columns();
    let list = "";

    for (var i in customizedColumns) {
        let column = customizedColumns[i];
        let checked = "";
        if (columns.indexOf(column.Name) > -1)
            checked = "checked";

        list += '<li class="ui-sortable-handle"><label class="boolean-control mt-checkbox mt-checkbox-outline"><input class="custom-column" data-field="' + column.Name + '" id="chkFields_' + i + '" type="checkbox" ' + checked +'><label for="chkFields_' + i + '">' + column.Title + '</label><span></span></label></li>';
    }

    const body = `
    <ul id="chkFields" class="editor-check-list ui-sortable">
        `+ list + `
    </ul>`;

    let box = bootbox.dialog({
        title: 'Configurar colunas',
        message: body,
        backdrop: true,
        show: false,
        onEscape: function () { bootbox.hideAll(); },
        buttons: {
            main: {
                label: 'Restaurar',
                className: 'default',
                callback: function () {
                    Grid[idWidget].defineColumns('');
                }
            },
            success: {
                label: 'OK',
                className: 'blue btn-primary',
                callback: function () {
                    let columns = [];
                    $('.custom-column').each(function () {
                        if ($(this).is(":checked")) {
                            columns.push($(this).data("field"));
                        }
                    });

                    Grid[idWidget].defineColumns(columns);
                }
            }
        }
    });

    box.on("shown.bs.modal", function () {
        $("#chkFields").sortable();
    });
    box.modal();
};

Grid.showMessageSelectedRows = function (selectedHandlesList, widgetId) {
	MessagePanel.clear($(`#${widgetId} .multi-select-message`));

	let handlesInThisPagination = $(`#HandlesInThisPagination_${widgetId}`);
	let handlesInThisPaginationList = this.inputHiddenToList(handlesInThisPagination);
	let rowsInPageLength = $(`#${widgetId} tbody tr .multi-select-column input`).length;
	let hasPagination = !$(`#${widgetId} .pagination`).hasClass('hidden');


	//se tem paginação não deve aparecer a mensagem para selecionar todos os registros das outras páginas

	if (selectedHandlesList.length == rowsInPageLength && !_.difference(handlesInThisPaginationList, selectedHandlesList).length && hasPagination) {
		let widgetUniqueId;
		if (this.isCustomLookup()) {
			widgetUniqueId = $('[widget-type="LookupSearchGrid"]').attr('widget-uniqueid');
		}
		else
			widgetUniqueId = $(`#${widgetId}`).attr('widget-uniqueid');
		MessagePanel.show('info', `Os ${rowsInPageLength} itens desta página estão selecionados. <a onclick="Benner.Grid.selectAll('${widgetUniqueId}')">Selecionar todos os restantes?</a></span>`, null, null, $(`#${widgetId} .multi-select-message`))
	}
	else if (selectedHandlesList.length == 0)
		MessagePanel.clear($(`#${widgetId} .multi-select-message`));
	else
		MessagePanel.show('info', `${selectedHandlesList.length} itens selecionados`, null, null, $(`#${widgetId} .multi-select-message`))
};

Grid.inputHiddenToList = function (inputHidden) {

	let selectedHandles = $(inputHidden).val().split('|');
	if (selectedHandles == "")
		selectedHandles = [];

	return selectedHandles;
};

Grid.updateCheckboxInHeader = function (widgetId) {
	let checkboxsInHeader = $(`#${widgetId} thead tr .multi-select-column input`);
	let checkboxsInBody = $(`#${widgetId} tbody tr .multi-select-column input:enabled`);
	let checkboxsCheckedInBody = $(`#${widgetId} tbody tr .multi-select-column input:enabled:checked`)

	if (checkboxsInBody.length == checkboxsCheckedInBody.length)
		checkboxsInHeader.prop("checked", true);
	else
		checkboxsInHeader.prop("checked", false);
}

Grid.selectAll = function (widgetClientId) {
	__doPostBack(widgetClientId, '#SelectAllRows');
};

Grid.isCustomLookup = function () {
	if ($('.modal:visible iframe.customlookup', parent.document).length)
		return true;
	else
		return false;
};

Grid.updateCheckboxValue = function ($checkbox) {
    if ($checkbox.is(":checked")) {
        $checkbox.parents("tr").addClass("active");
        $checkbox.parents("tr").addClass("checked");
    }
    else {
        $checkbox.parents("tr").removeClass("active");
        $checkbox.parents("tr").removeClass("checked");
    }
};

Grid.updateTotalizerRow = function (widgetClientId, isSimpleGrid, isSelectedAllRows, widgetId, selectedHandle) {
    let columnTotalizers = document.querySelectorAll("#" + widgetClientId + " .totalizer-row > .totalizer-cell");

    let rows = document.querySelectorAll("#" + widgetClientId + " tbody > tr.active.checked:not(.totalizer-row)");
    let totalizeInputValues = Grid.getTotalizerInputValues(widgetId);

    let selectedHandlesInput = $('#SelectHandlesInput_' + widgetId);
    let selectedHandlesList = this.inputHiddenToList(selectedHandlesInput);
    let deselectUniqueRow = selectedHandlesList.length == 1 && selectedHandlesList.indexOf(selectedHandle) >= 0;

    if ((rows.length > 0 || totalizeInputValues) && !isSelectedAllRows && !deselectUniqueRow) {
        let totalizers = Grid.getTotalizers(columnTotalizers, widgetId);
        Grid.loadDataTotalizers(widgetClientId, totalizers, isSimpleGrid, widgetId, selectedHandle);
        if (document.querySelectorAll("#" + widgetClientId + " .totalizer-row").length > 0) {
            Grid.updateTotalizer(columnTotalizers, totalizers);
        }
    } else {
        for (let i = 0; i < columnTotalizers.length; i++) {
            let columnTotalizer = columnTotalizers[i];
            columnTotalizer.textContent = columnTotalizer.dataset.valueDb;
            if (totalizeInputValues) {
                var valueBD = parseFloat(columnTotalizer.dataset.valueDb.replace("R$", "").replaceAll(".", "").replace(",", "."));
                if (totalizeInputValues[i].aggregateOperation == AggregateOperationOption.Average) {
                    totalizeInputValues[i].value = valueBD * selectedHandlesList.length;
                }
                else {
                    totalizeInputValues[i].value = valueBD;
                }
                totalizeInputValues[i].count = selectedHandlesList.length;
            }
        }

        if (columnTotalizers.length > 0) {
            columnTotalizers[0].parentNode.classList.remove("active");
        }

        if (deselectUniqueRow) {
            Grid.setTotalizerInputValues("", widgetId);
        }
        else {
            Grid.setTotalizerInputValues(totalizeInputValues, widgetId);
        }
    }
};

Grid.applyTotalizer = function (fieldTotalizer, newItem, isAddValue, isRemoveValue, rowHandle) {
    if (newItem === null || newItem.trim() === "")
        return fieldTotalizer.value;

    if (isRemoveValue) {
        fieldTotalizer.count--;
    }
    else if (isAddValue) {
        fieldTotalizer.count++;
    }

    newItem = parseFloat(newItem.replace("R$", "").replaceAll(".", "").replace(",", "."));
    switch (fieldTotalizer.aggregateOperation) {
        case AggregateOperationOption.Count: {
            if (isRemoveValue) {
                fieldTotalizer.value--;
            }
            else {
                fieldTotalizer.value++;
            }
            break;
        }
        case AggregateOperationOption.Average:
        case AggregateOperationOption.Sum: {
            if (isRemoveValue) {
                fieldTotalizer.value -= newItem;
            }
            else {
                fieldTotalizer.value += newItem;
            }
            break;
        }
        case AggregateOperationOption.Max:
            if (isRemoveValue) {
                let isDbValue = fieldTotalizer.historyValues.indexOf(fieldTotalizer.value) == -1;

                let indexToRemove = fieldTotalizer.historyValues.indexOf(newItem);
                fieldTotalizer.historyValues.splice(indexToRemove, 1);

                indexToRemove = fieldTotalizer.rowHandles.indexOf(rowHandle);
                fieldTotalizer.rowHandles.splice(indexToRemove, 1);

                if (!isDbValue || (isDbValue && fieldTotalizer.value == newItem)) {
                    fieldTotalizer.value = _.maxBy(fieldTotalizer.historyValues);
                }
            }

            else {
                if (fieldTotalizer.value < newItem) {
                    fieldTotalizer.value = newItem;
                }
                fieldTotalizer.historyValues.push(newItem);
                fieldTotalizer.rowHandles.push(rowHandle);
            }
            break;

        case AggregateOperationOption.Min:
            if (isRemoveValue) {
                let isDbValue = fieldTotalizer.historyValues.indexOf(fieldTotalizer.value) == -1;

                let indexToRemove = fieldTotalizer.historyValues.indexOf(newItem);
                fieldTotalizer.historyValues.splice(indexToRemove, 1);

                indexToRemove = fieldTotalizer.rowHandles.indexOf(rowHandle);
                fieldTotalizer.rowHandles.splice(indexToRemove, 1);

                if (!isDbValue || (isDbValue && fieldTotalizer.value == newItem)) {
                    fieldTotalizer.value = _.minBy(fieldTotalizer.historyValues);
                }
            }

            else {
                if (fieldTotalizer.value > newItem) {
                    fieldTotalizer.value = newItem;
                }
                fieldTotalizer.historyValues.push(newItem);
                fieldTotalizer.rowHandles.push(rowHandle);
            }
            break;
    }
};

Grid.getFieldValue = function (field, isSimpleGrid) {

    if (isSimpleGrid) {
        return field.children[0].text;
    } else {
        let $selectField = $(field).find("select");
        if ($selectField.length > 0) {
            return $selectField.val();
        }

        let $inputField = $(field).find("input");
        if ($inputField.length > 0) {
            return $inputField.val();
        }
    }
};

Grid.getFormatValue = function (value, typeField, decimalValue) {
    if (typeField === "currency") {
        value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (typeField === "number") {
        value = value.toLocaleString('pt-BR', { minimumFractionDigits: decimalValue, maximumFractionDigits: decimalValue });
    } else if (typeField === "integer" && value.toString().indexOf(".") !== -1) {
        value = value.toString().substr(0, value.toString().indexOf("."));
    }
    return value;
};

Grid.rowChanged = function (idChangeRecord, gridClientId, handle) {
    var hiddenField = document.getElementById(gridClientId);
    if (hiddenField) {
        hiddenField.value = hiddenField.value + handle + '|';
    }
    //Atualiza o label que indica se o registro foi alterado
    if (idChangeRecord != null && idChangeRecord != "") {
        $("#" + idChangeRecord).addClass("bg-red");
    }
};

Grid.pagination = function(control, idDataChanged) {

    var postbackUrl = $(control).attr('href');
    $(control).removeAttr('href');

    let dataChanged = document.getElementById(idDataChanged);
    if (dataChanged.value !== null && dataChanged.value !== "") {
        bootbox.dialog({
            title: 'Abandonar alterações',
            message: 'Você fez alterações que ainda não foram salvas. Se você sair desta página elas serão perdidas. Deseja continuar?',
            onEscape: function () { bootbox.hideAll(); },
            buttons: {
                success: {
                    label: 'Sim',
                    className: 'red',
                    callback: function () {
                        dataChanged.value = "";
                        window.location.href = postbackUrl;
                    }
                },
                main: {
                    label: 'Não',
                    className: 'default',
                    callback: function () {
                        $(control).attr('href', postbackUrl);
                    }
                }
            }
        });
    } else {
        window.location.href = postbackUrl;
    }    
}

export default Grid;