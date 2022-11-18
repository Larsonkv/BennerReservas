import Dropzone from 'dropzone';
import Page from './Page';
Dropzone.autoDiscover = false;

var DropZone = {};

DropZone.init = function () {
    $('.benner-dropzone.dropzone.dz-clickable.btn-default').each((i, val) => {
        var currentFile = null;
        var dropzoneControl = $("#" + val.id)[0].dropzone;
        if (dropzoneControl) {
            dropzoneControl.destroy();
        }

        var allExtensions = null;
        if ($(val)[0].attributes["action"] == undefined)
            return;

        var url = new URL(window.location.origin + $(val)[0].attributes["action"].value);
        var field = url.searchParams.get("fieldName");
        var key = url.searchParams.get("entitySessionKey");
        var view = url.searchParams.get("viewName");

        $.ajax({
            url: Page.getApplicationPath() + "api/dropzone/extensions",
            data: { viewName: view, fieldName: field },
            dataType: "json",
            async: false,
            success: function (data) {
                allExtensions = data;
            },
        });

        $("#" + val.id).dropzone({
            maxFiles: 1,
            maxFilesize: (Benner.Page.maxFileSizeInKB/1000),
            acceptedFiles: allExtensions,
            dictInvalidFileType: "Extens\u00e3o de arquivo inv\u00e1lida!",
            dictFileTooBig: "Tamanho do arquivo muito grande!",

            addedfile: function (file) {
                if (currentFile) {
                    this.removeFile(currentFile)
                }
                currentFile = file;
                App.blockUI({ textOnly: false, boxed: true, message: "<span class='message'>Aguarde o carregamento do arquivo.</span> <span class='progrees'></span>", zIndex: 11000 });

            },

            uploadprogress: function (file, progress, bytesSent) {
                $('.loading-message.loading-message-boxed span.progrees').text(parseInt(progress) + "%");
            },

            maxfilesexceeded: function (file, response) {
                this.removeFile(file);
            },
            error: function (file, errorMessage) {
                if (file.xhr != undefined && file.xhr.status === "413")
                    swal("", "Tamanho do arquivo muito grande!", "error");
                else
                    swal("", errorMessage, "error");

                App.unblockUI();
            },
            success: function (file, resp) {
                if (resp.error != null) {
                    swal("", resp.error, "error");
                    App.unblockUI();
                    return;
                }
                var span = $("#" + val.id)[0].childNodes[0];
                var fileSize = Math.ceil(file.size / 1024) + "KB";
                let fileName = file.name;
                if (fileName.length >= 45) {
                    fileName = file.name.substring(0, 25).concat("...", file.name.substring(file.name.length - 10, file.name.length));
                }
                App.unblockUI();
                span.innerText = fileName.concat(" - ", fileSize);
            }

        });

        $("#" + val.id + "-clear-file").on("click", function (e) {
            e.preventDefault();
            $.ajax({
                url: Page.getApplicationPath() + "api/dropzone/delete",
                data: { entitySessionKey: key, fieldName: field },
                success: function (data) {
                    $("#" + val.id)[0].childNodes[0].innerText = data;
                    $("#" + val.id)[0].dropzone.removeAllFiles(true);
                },
            });
        });

        $("#" + val.id + "-upload-file").on("click", function (e) {
            e.preventDefault();
            $("#" + val.id)[0].dropzone.hiddenFileInput.click();
        });
    });
}

export default DropZone;