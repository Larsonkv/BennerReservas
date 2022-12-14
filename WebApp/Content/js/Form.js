import ModalPage from './ModalPage';
import Control from './Control';
import { FormModeReadOnly, FormModeView } from './FormMode';
import 'jquery-minicolors';
import ShowHandles from './ShowHandles';

var Form = function () {

};

Form.extend = function (widget) {
    var formMode = $(widget.el()).find(".form-mode").val();

    return Object.extend(widget, {
        formViewMode: formMode,
        getFormModeContainer: function () {
            if (this.formViewMode === "View")
                return new FormModeView();
            else
                return new FormModeReadOnly();
        },
        new: function () {
            this.command("New");
        },
        save: function () {
            this.command("Save");
        },
        cancel: function () {
            this.command("Cancel");
        },
        edit: function () {
            this.command("Edit");
        },
        toJson: function () {
            return this.fields();
        },
        field: function (fieldName) {
            if (!fieldName)
                return;
            let form = $(widget.el()).find(".form-container");
            let formModeContainer = this.getFormModeContainer();
            let ct = Control.getControlByDataField(fieldName, form);
            return formModeContainer.getFieldValue(ct);
        },
        fields: function () {
            var form = $(widget.el()).find(".form-container");
            let formModeContainer = this.getFormModeContainer();
            
            return Form.getFields(form, formModeContainer);
        }
    });
};

Form.getFields = function (form, formModeContainer) {
    var enabledFields = form.find("[data-field]");
    var props = {};
    _.forEach(enabledFields, (c, k) => {
        let fieldName = c.getAttribute("data-field");
        if (fieldName) {
            var ct = Control.getControlByDataField(fieldName, form);
            props[fieldName.toLowerCase()] = formModeContainer.getFieldValue(ct);
        }
    });

    return props;
};

Form.confirmDeletePostBack = function (controlId, command) {
    bootbox.dialog({
        title: 'Excluir',
        message: 'Confirma a exclusão?',
        onEscape: function () { bootbox.hideAll(); },
        buttons: {
            success: {
                label: 'Sim',
                className: 'red btn-primary',
                callback: function () {
                    window.location.href = 'javascript:__doPostBack("' + controlId + '", "' + command + '");';
                    ShowHandles.removeHandleForm(); 
                }
            },
            main: {
                label: 'Não',
                className: 'default'
            }
        }
    });
};

Form.confirmDelete = function (control) {
    var postbackUrl = $(control).attr('href');

    $(control).removeAttr('href');

    bootbox.dialog({
        title: 'Excluir',
        message: 'Confirma a exclusão?',
        onEscape: function () { bootbox.hideAll() },
        buttons: {
            success: {
                label: 'Sim',
                className: 'red  btn-primary',
                callback: function () {
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
};

Form.closeUpload = function (fileName, controlId) {
    $("#" + controlId).val(fileName);
    ModalPage.hide();
    $("#" + controlId).focusOnNextField();
};

Form.closeImage = function (fileName) {
    var image = $("#" + fileName);
    if (image != null) {
        var src = $(image).children().attr("src");
        $(image).children().attr("src", src + "#");
    }

    ModalPage.hide();
    $(image).siblings().find("button").focus();
};

Form.UpdateHiddenActiveTabPageIndex = function (hiddenFieldId, tabId) {
    if (hiddenFieldId) {
        var hidden = $("#" + hiddenFieldId);
        hidden.val(tabId);

        Control.storeCurrentFocus(hidden.get(), "next");
        setTimeout(function () {
            Control.restoreFocus();
        }, 0);
    }
};

Form.replaceEmptyCharactersByMaskPlaceholder = function (field) {
    var mask = $(field).inputmask('getemptymask');
    var value = $(field).val().split('');
    var mask = $(field).inputmask('getemptymask');
    var placeholder = $(field).data("inputmaskplaceholder");
    for (var i = 0; i <= value.length; i++) {
        if (value[i] != " " && value[i] == placeholder && mask[i] != " ") //só substitui os espaços quando for um caractere que o usr digitou, não os que fazem parte da máscara
            value[i] = "";
        if (value[i] == " " && value[i] != placeholder && mask[i] != " ")
            value[i] = placeholder;
    }

    return value.join("").trim();
};

Form.validFieldPassword = function (event, idPassword, idConfirPassword) {
    if ($("#" + idConfirPassword).val() != "" && $("#" + idPassword).val() != $("#" + idConfirPassword).val())
        alert("Senhas informadas não conferem.");
};

Form.initializeTooltips = function () {
    //Tooltip informado campo dica
    $('.help-tooltip').tooltip(
        {
            template: '<div class="tooltip" role="tooltip"><div class="error-tooltip-arrow tooltip-arrow"></div><div class="error-tooltip-inner tooltip-inner"></div></div>'
        }
    );
    //Tooltip informando campo obrigatório
    $('.has-error').tooltip(
        {
            template: '<div class="tooltip error-tooltip" role="tooltip"><div class="error-tooltip-arrow tooltip-arrow"></div><div class="error-tooltip-inner tooltip-inner"></div></div>',
            placement: 'bottom'
        }
    );
};

Form.changeStateGroup = function (section) {

    var groupSection = section.parentNode;
    if (groupSection.tagName !== "H4")
        groupSection = groupSection.parentNode;

    var fontIcon = groupSection.lastElementChild.firstChild;

    var cookie = "";
    var idSection = groupSection.getAttribute("data-id");

    if (fontIcon.classList.contains("fa-angle-down")) {
        fontIcon.classList.remove("fa-angle-down");
        fontIcon.classList.add("fa-angle-up");

        groupSection.classList.add("minimized");

        cookie = idSection + "=closed; path=/";
    } else {
        fontIcon.classList.remove("fa-angle-up");
        fontIcon.classList.add("fa-angle-down");

        groupSection.classList.remove("minimized");

        cookie = idSection + "=open; path=/";
    }
    document.cookie = cookie;
};

Form.handleForm = function () {
    //Inicializa o componete autonumeric, para campos do tipo integer, valor e numero
    $('form .auto-numeric:not([readonly])').autoNumeric('init', {
        aSep: '.',
        aDec: ',',
    });

    //Cria novos caracteres para o iputmask
    //Inicializa o inputmask
    Inputmask.extendDefinitions({
        'c': {
            "validator": "n*",
            "cardinality": 1,
        },
        '#': {
            "validator": "[0-9+-_ ]",
            "cardinality": 1,
        },
        'a': {

            "validator": "[A-Za-z0-9_ ]",
            "cardinality": 1,
        },
        'l': {
            "validator": "[A-Za-z_ ]",
            "cardinality": 1,
        },
        '9': {
            "validator": "[0-9_ ]",
            "cardinality": 1,
        }
    });
    Inputmask.extendDefaults({
        clearMaskOnLostFocus: false,
        groupmarker: { start: "((", end: "))" }
    });


    ///SMS-1854487 - A cada postback executado na página, esse fonte é chamado pelo Page.endRequest.
    ///Como o método Form.replaceEmptyCharactersByMaskPlaceholder() ajusta os valores dos campos com máscara, 
    ///para que os espaços sejam subtituídos pelo placeholder, etc, esse método só pode ser chamado uma vez, 
    ///pois se executado novamente, o valor do input terá o placeholder removido e substitído por vazio ('').
    ///A class .input-mask-instantiated evita que método seja chamado novamente.
    ///Como essa class somente é inserida via JS, a construção do HTML via serverside sempre irá retornar o campo sem essa class,
    ///fazendo com que os devidos ajustes que ocorrem no método Form.replaceEmptyCharactersByMaskPlaceholder() executem somente um vez.
    $('.input-mask:not(.input-mask-instantiated)').each(function () {
        const HIDDEN_TYPE = 'hidden';
        const TEXT_TYPE = 'text';
        let fieldWithMask = $(this);
        let originalFieldType = fieldWithMask.attr("type");

        //Para aplicar mascara em um input, ele precisa ser do tipo text.
        //Em casos que o input com mascara esta oculto, é preciso converte-lo para text,
        //aplicar a mascara em seu valor, e depois voltar para seu tipo original hidden
        if (originalFieldType === HIDDEN_TYPE) {
            convertFieldType(fieldWithMask, TEXT_TYPE)
        }

        fieldWithMask.inputmask('remove');
        fieldWithMask.inputmask();
        fieldWithMask.val(Form.replaceEmptyCharactersByMaskPlaceholder(fieldWithMask));
        fieldWithMask.addClass("input-mask-instantiated");

        if (originalFieldType === HIDDEN_TYPE && fieldWithMask.attr("type") === TEXT_TYPE) {
            convertFieldType(fieldWithMask, HIDDEN_TYPE)
        }
    });

    $.minicolors.defaults = $.extend($.minicolors.defaults, {
        theme: 'bootstrap'
    });
    $(".minicolors-input").minicolors();
};

var convertFieldType = function (control, fieldType) {
    control.attr("type", fieldType);
}

Form.init = function () {
    Form.handleForm();
    Form.initializeTooltips();
};

export default Form;