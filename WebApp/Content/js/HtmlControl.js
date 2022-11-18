var HtmlControl = function () {
    return {
        init: function () {
            let $htmlControls = $(".html-control");

            if ($htmlControls.length === 0)
                return;

            import('./SummerNote').then(function (module) {
                var itensToolbars = [['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'codeview', 'hr']],
                ['view', ['fullscreen']],
                ['help', ['help']]];
                //Inicializa o componente
                $htmlControls.summernote({
                    height: 160,
                    lang: 'pt-BR',
                    toolbar: itensToolbars,
                    disableDragAndDrop: true,
                    callbacks: {
                        onBlur: function () {
                            //Verifica que foi alterado a informação antes disparar o script python
                            var $hidden = $("#" + this.id + "_HIDDEN");
                            var $summerNote = $(this).html().trim();
                            if ($summerNote != $hidden.val())
                                $(this).change();
                        },
                        onChange: function (contents) {
                            //Adiciona o valor digitado no editor de html no campo hidden
                            var $hidden = $("#" + this.id + "_HIDDEN");
                            if ($hidden != null) {
                                $hidden.val(contents.trim());
                            }
                        }
                    }
                });

            });
        }
    };
}();

export default HtmlControl;