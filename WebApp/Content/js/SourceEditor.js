var SourceEditor = {};

SourceEditor.items = Array();
SourceEditor.langTools = null;

SourceEditor.add = function (editor) {
    SourceEditor.items[SourceEditor.items.length] = editor;
    return editor;
};

SourceEditor.lastAceEditor = function () {
    return SourceEditor.items[SourceEditor.items.length - 1];
};

SourceEditor.AceEditor = function (index) {
    return SourceEditor.items[index].editor;
};

SourceEditor.addEventChange = function ($field, editorSession) {
    $field.hide();
    editorSession.on('change', function () {
        $field.val(editorSession.getValue());
    });
    editorSession.setValue($field.val());
};

SourceEditor.init = function (callback) {
    const editors = $('div.source-editor');
    if (editors.length === 0)
        return;

    import('./AceEditor').then(function (module) {
        var ace = module.default.ace;
        SourceEditor.langTools = module.default.langTools;
        $(editors).each(function () {
            var div = $(this);
            var mode = div.data('mode');
            var readonly = div.data('readonly');
            var loaded = div.data('loaded');

            if (!mode || loaded)
                return;

            var editor = ace.edit(div[0]);
            editor.setTheme("ace/theme/chrome");
            editor.setPrintMarginColumn(-1);
            editor.$blockScrolling = Infinity;
            let session = editor.getSession();
            session.setMode("ace/mode/" + mode);
            session.setUseWrapMode(true);
            editor.setReadOnly(readonly);
            editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            });

            div.data('loaded', true);
            editor.focus();

            let fieldName = div.data('bind-field');
            if (fieldName) {
                let $field = $(".widget-body *[data-field=" + fieldName + "]");
                if ($field.length > 0) {

                    let $inputField = $field.children("input");
                    if ($inputField.length > 0) {
                        SourceEditor.addEventChange($inputField, session);
                        return;
                    }

                    let $textAreaField = $field.children("textarea");
                    if ($textAreaField.length > 0) {
                        SourceEditor.addEventChange($textAreaField, session);
                        return;
                    }
                }
            }

            let bindId = div.data('bind-id');
            if (bindId) {
                let $bindElement = $("#" + bindId);
                if ($bindElement.length > 0) {
                    SourceEditor.addEventChange($bindElement, session);
                }
            }

            SourceEditor.add(editor);
        });

        if (callback)
            callback();
    });
};

export default SourceEditor;