import ModalPage from '../js/ModalPage';
import Page from '../js/Page';
import Search from '../js/Search';
import Control from '../js/Control';

var CustomLookup = function () {
};

CustomLookup.init = function () {
    $("iframe").contents().keyup(function (e) {
        if (e.keyCode == 27) // esc
        {
            if (parent != null)
                parent.Benner.ModalPage.hide();
            else
                ModalPage.hide();
        }
        if (e.keyCode == 13) // enter
        {
            var $textBox = $(this).find("#searchTextBox");
            if ($textBox.length && $textBox.is(':focus')) {
                var $button = $("iframe").contents().find('#searchButton');
                if ($button.length) {
                    $button.trigger("click");
                    $textBox.focus();
                }
            }
        }
	});
	$("iframe").addClass('customlookup');
};

CustomLookup.showDialog = function (senderControlId) {
    var sender = $('#' + senderControlId);

    var searchContext = $(sender).data('searchcontext');
    var dependencyValues = Search.recoverDependValueList($(sender));
    var customPageUrl = $(sender).data("popupurl");

    var queryString =
        "?sc=" + searchContext +
        "&dv=" + dependencyValues;

    var fields = "";
    if ($(sender).data('changeeventtype') === "callpython" || $(sender).data('changeeventtype') === "callscriptui") {
        fields = Search.getFieldsToJson($(sender));
    }

    var parameters = {};
    parameters.fields = fields;

    if (sender.is("[multiple]")) {
        parameters.selectColumnVisible = 1;
		var values = sender.val();
        if (values && Array.isArray(values))
            parameters.selectedHandles = values.join("|");
    }

    if (customPageUrl == null || customPageUrl.length == 0)
        customPageUrl = Page.getApplicationPath() + "DefaultLookupSearch.aspx";

	Control.storeCurrentFocus("#" + senderControlId, 'same');
    $('body').attr('data-searchControlId', senderControlId);
    $('body').data('scroll-pos', { x: $(window).scrollLeft(), y: $(window).scrollTop() });

    ModalPage.show(
        { 
            id: senderControlId, 
            size: 'large', 
            height: 670, 
            displayFooter: true, 
            url: customPageUrl + queryString, 
            title: '', 
            executePost: true,
			parameters: parameters
        }, 
        null, 
		Control.restoreFocus);
};

CustomLookup.removeAllSelectedItems = function (targetcontrol) {
    if ($(targetcontrol).is('[multiple]')) {
        parent.$(targetcontrol).find("option").each(
            function () {
                $(this).remove();
            });
        parent.$(targetcontrol).trigger('change');
    } else {
        Control.restoreFocus();
    }
}

CustomLookup.removeSelectedItem = function (handle, targetcontrol, selectedData, item) {
    if ($(targetcontrol).is('[multiple]')) {
        parent.$(targetcontrol).find("option[value='" + handle + "']").each(
            function () {
                $(this).remove();
            });
        _.remove(selectedData, item);
        parent.$(targetcontrol).trigger('change');
    } else {
        Control.restoreFocus();
    }
}

CustomLookup.applySelectionAndHideDialog = function (arg1, arg2) {

	let targetcontrol = CustomLookup.getTargetControlOfLookup();

    if (targetcontrol != null) {
        if (!$(targetcontrol).is('[multiple]'))
			parent.Benner.ModalPage.hide();

		var selectedData = parent.$(targetcontrol).select2("data");
        if (!selectedData || !selectedData.length)
            selectedData = [];
        
        var elements = [];
        
        if (typeof arg1 === "undefined" || arg1 === null) {
            elements.push({ id: null, text: null });
        } else if ($.isArray(arg1)) {
            elements = arg1;
        } else {
            elements.push({ id: arg1, text: arg2 });
        }
        
        var fragment = document.createDocumentFragment();
        var fragmentCount = 0;

        _.forEach(elements, (item) => {
            var handle = item.id;
            var text = item.text;

            var foundItem = _.find(selectedData, { id: handle });

            // caso já esteja selecionado, não faz nada
            if (foundItem !== undefined) {
                CustomLookup.removeSelectedItem(handle, targetcontrol, selectedData, foundItem);
            } else if (handle == null && text == null)
                parent.$(targetcontrol).empty();
            else {
                var options = $('<option>',
                    {
                        text: text,
                        value: handle,
                        selected: "selected"
                    });
                $(options).appendTo(fragment);
                fragmentCount = fragmentCount + 1;
            }
        });

        if (fragmentCount > 0) {
            parent.$(targetcontrol).append(fragment);
        }

        parent.$(targetcontrol).trigger("select2:select");
    }
};

CustomLookup.applyAllTableSelectedOnTargetControl = function () {

    let allEntitiesInTable = $("#allEntitiesInTable").val();
	if (!allEntitiesInTable)
		return;

	allEntitiesInTable = JSON.parse(allEntitiesInTable);
	this.cleanSelectionOnTargetControl();

    this.applySelectionAndHideDialog(allEntitiesInTable);
};

CustomLookup.getTargetControlOfLookup = function () {
	var searchControlId = $(parent.document.body).data('searchcontrolid')
	return $('#' + searchControlId, parent.document);
};

CustomLookup.cleanSelectionOnTargetControl = function () {
	this.applySelectionAndHideDialog(null);
};

export default CustomLookup;