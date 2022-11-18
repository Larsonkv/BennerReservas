var ArtifactsDiff = function () {
    return {
        init: function (databaseContent, fileContent) {
            import('ace-diff/dist/ace-diff.min').then(function (module) {
                let diff = module.default;
                new diff({
                    element: '#aceDiff',
                    left: {
                        editable: false,
                        copyLinkEnabled: false,
                        content: databaseContent
                    },
                    right: {
                        editable: false,
                        copyLinkEnabled: false,
                        content: fileContent
                    }
                });

            });
        }
    };
}();

export default ArtifactsDiff;
