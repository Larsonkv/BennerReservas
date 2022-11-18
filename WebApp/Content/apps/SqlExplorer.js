import Http from '../js/Http';
import FuncoesArroba from './FuncoesArroba';
import SourceEditor from '../js/SourceEditor';

var SqlExplorer = function () {
    let allTables = null;
    let allFunctions = null;
    let initialized = false;

    let getFields = function (sql, callback) {
        var regex = /\s(?:FROM|JOIN)\s([A-z0-9_]+)\s/gim;
        var tables = [];
        do {
            var match = regex.exec(sql);
            if (match) {
                if (match.length > 0)
                    tables.push(match[1]);
            }
        } while (match);

        if (tables.length > 0) {
            Http.post("api/sqlexplorer/fields", tables).then(response => {
                let fields = response.body;
                if (fields && fields.length > 0) {
                    callback(null, fields);
                }
            });
        }
    };

    var autoComplete = function (langTools) {
        var customCompleter = {
            getCompletions: function (editor, session, pos, prefix, callback) {
                getFields(session.getValue(), callback);
                callback(null, allTables);
                callback(null, allFunctions);
            }
        };

        if (langTools)
            langTools.addCompleter(customCompleter);
    };

    var listaSql = JSON.parse(localStorage.getItem("SqlExplorer"));
    var currentIndex = 0;
    if (listaSql !== null) 
        currentIndex = listaSql.length - 1;
    
    else 
        listaSql = [];

    var persistSql = function () {
        if (SourceEditor.lastAceEditor() != null) {
            var value = SourceEditor.lastAceEditor().session.getValue();

            if (listaSql.length >= 100) {
                listaSql.shift();
            }
            if (value.trim().length !== 0 && !listaSql.includes(value.trim())) {
                listaSql.push(value.trim());
                localStorage.setItem("SqlExplorer", JSON.stringify(listaSql));
            }
        }
    };

    var getNext = function () {
        if (SourceEditor.lastAceEditor() != null) {
            if (listaSql.length !== 0) {
                currentIndex++;
                if (currentIndex >= listaSql.length) {
                    currentIndex = listaSql.length - 1;
                }
                SourceEditor.lastAceEditor().session.setValue(listaSql[currentIndex]);
            }
        }
    };

    var getPrevious = function () {
        if (SourceEditor.lastAceEditor() != null) {

            if (listaSql.length !== 0) {
                currentIndex--;
                if (currentIndex <= 0) {
                    currentIndex = 0;
                }
                SourceEditor.lastAceEditor().session.setValue(listaSql[currentIndex]);
            }
        }

    };

    var cleanHistoric = function () {
        if (listaSql.length > 0) {
            localStorage.removeItem("SqlExplorer");
            listaSql = [];
        }

        $("#btnClear i").addClass("fa-spin").delay(2000).queue(function (next) {
            $(this).removeClass("fa-spin");
            next();
        });
    };

    return {
        init: function () {
            if (initialized === true)
                return;
            $(document).keydown(function (event) {
                if (event.which === 13 && event.ctrlKey) {
                    persistSql();
                    var href = $("#btnExecute").attr("href");
                    if (href != null) {
                        window.location.href = href;
                    }
                }
            });

            $(document).keyup(function (e) {
                if (e.which === 38 && e.ctrlKey) {
                    getNext();
                }
                else if (e.which === 40 && e.ctrlKey) {
                    getPrevious();
                }
            });

            if (!allTables) {
                Http.get('api/sqlexplorer/tables').then(response => {
                    allTables = response.body;
                });
            }

            if (!allFunctions) {
                Http.get('api/sqlexplorer/functions').then(response => {
                    allFunctions = response.body;
                });
            }

            import('../js/AceEditor').then(function (module) {
                autoComplete(module.default.langTools);
            });

            this.initAjax();

            initialized = true;
        },
        initAjax: function () {
            $("#btnNext").click(function (e) {
                getNext();
            });

            $("#btnPrevious").click(function (e) {
                getPrevious();
            });

            $("#btnClear").click(function (e) {
                cleanHistoric();
            });
        }
    };
}();

export default SqlExplorer;