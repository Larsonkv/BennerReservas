/*[ Rotinas da Classe DATE */
var BDate = function () {
    var handleDatePickers = function () {
        if (jQuery().datepicker) {
            var dateControl = $('.datepicker:enabled:not([readonly])');

            if (dateControl.length > 0) {

                dateControl.datepicker({
                    rtl: App.isRTL(),
                    orientation: "left",
                    autoclose: true,
                    language: "pt-BR",
                    todayBtn: "linked",
                    forceParse: false
                })
                .off('focus')
                .click(function () {
                    $(this).datepicker('show');
                });

                // handle input group button click
                dateControl.next().children('button').on('click', function (e) {
                    e.preventDefault();
                    var datePicker = $(this).parent().parent().find('.datepicker');
                    datePicker.datepicker('show');
                    datePicker.focus();
                });

                dateControl.on('focusout', function (e) {
                    var value = $(this).val();
                    var format = $(this).attr("data-date-format");
                    var textDate = BDate.discoveryDate(value, format);
                    var date = moment(textDate, 'DD/MM/YYYY');
                    if (date && date.isValid())
                        $(this).val(date.format(format.toUpperCase()));
                });

                dateControl.on('keypress', function (e) {
                    if (e.key === 'h' || e.key === 'H' || e.charCode === 104 || e.keyCode === 72) {
                        $(this).datepicker('setDate', new Date());
                        $(this).change();
                        return;
                    } else
                        return BDate.validationKeyDate(e);
                });

                dateControl.on('keydown', function (e) {
                    $(e.currentTarget).datepicker('hide');
                });

                dateControl.on('paste', function (e) {
                    BDate.validationDatetime(this);
                });
            }
        }
    };

    var handleTimePickers = function () {

        if (jQuery().timepicker) {
            var timeControl = $('.timepicker:not([readonly])');
            if (timeControl.length > 0) {
                timeControl.timepicker({
                    autoclose: true,
                    disableFocus: false,
                    showMeridian: false,
                    minuteStep: 5,
                    defaultTime: false,
                    twoDigitsHour: true
                });

                //// handle input group button click
                timeControl.next().children('button').on('click', function (e) {
                    e.preventDefault();
                    $(this).parent().parent().find('.timepicker').timepicker('showWidget');
                });

                timeControl.on('keypress', function (e) {
                    return BDate.validationKeyTime(e);
                });

                timeControl.on('paste', function (e) {
                    BDate.validationDatetime(this);
                });
            }
        }
    };

    var handleDateRangePicker = function () {
        $('.daterangepicker-control').each(function () {
            var timePicker = $(this).data("timepicker");
            var timePickerSeconds = $(this).data("timepickerseconds");
            var format = $(this).data("format");
            var input = $(this).find('input');

            var setValue = function (start, end) {
                if (end && end.hour() === 0 && end.minute() === 0 && end.second() === 0)
                    end = end.endOf("day");
                if (start && end && start.isValid() && end.isValid())
                    input.val(start.format(format) + ' - ' + end.format(format));
                else
                    input.val("");
            };

            var getStartDate = function () {
                var value = input.val();
                if (!value)
                    return moment().subtract(1, 'days').startOf('day');

                var results = value.split("-");
                return moment(results[0], format);
            };

            var getEndDate = function () {
                var value = input.val();
                if (!value)
                    return moment();

                var results = value.split("-");
                if (results.length > 1) {
                    return moment(results[1], format);
                }

                return moment();
            };

            input.on('focusout', function (e) {
                var value = $(this).val();
                if (!value)
                    return;

                if (value.indexOf("-") > -1) {
                    var results = value.split("-");
                    var value1 = results[0];
                    var text1 = BDate.discoveryDate(value1, format);
                    if (results.length > 1) {
                        var value2 = results[1];
                        var text2 = BDate.discoveryDate(value2, format);
                        setValue(moment(text1, format), moment(text2, format));
                    }
                    else
                        setValue(moment(text1, format), moment(text1, format));
                }
                else {
                    var text = BDate.discoveryDate(value, format);
                    setValue(moment(text, format), moment(text, format));
                }
            });

            var startDate = getStartDate();
            var endDate = getEndDate();

            $(this).daterangepicker({
                opens: 'left',
                showDropdowns: true,
                showWeekNumbers: false,
                timePicker: timePicker,
                startDate: startDate,
                endDate: endDate,
                timePickerSeconds: timePickerSeconds,
                timePickerIncrement: 1,
                timePicker24Hour: true,
                buttonClasses: ['btn'],
                applyClass: 'green',
                cancelClass: 'default',
                autoUpdateInput: false,
                autoApply: false,
                ranges: {
                    'Hoje': [moment().startOf('day'), moment().endOf('day')],
                    'Ontem': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
                    'Últimos 7 dias': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
                    'Últimos 30 dias': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
                    'Este mês': [moment().startOf('month'), moment().endOf('month')],
                    'Último mês': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                locale: {
                    applyLabel: 'Aplicar',
                    separator: '-',
                    format: format,
                    fromLabel: 'De',
                    toLabel: 'Para',
                    customRangeLabel: 'Período customizado',
                    daysOfWeek: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
                    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    firstDay: 1
                }
            }, setValue);
        });

    };

    return {
        //main function to initiate the module
        init: function () {
            handleDatePickers();
            handleTimePickers();
            handleDateRangePicker();
        }
    };
}();

BDate.discoveryDate = function (value, format) {
    if (!value || !format || format.length === value.length && format != "yyyy")
        return value;

    value = value.trim();

    if (format.length > 10)
        return value;
    else if (format.length === 10)
        return Date.formatDayMonthYear(value, '/');
    else if (format.length === 7)
        return "01" + "/" + Date.formatMonthYear(value, '/');
    else
        return "01/01/" + value;
};

BDate.validationDatetime = function (control) {

    var input = $(control);
    setTimeout(function () {
        //Busca o formato do campo
        var placeholder = input.attr("placeholder");
        var regex;
        //Utiliza regex apropriada para o campo
        if (placeholder == "aaaa")
            regex = new RegExp(/\d{4}/g);
        else if (placeholder == "mm/aaaa")
            regex = new RegExp(/^(0[1-9]|1[0-2])\/\d{4}$/g);
        else if (placeholder == "dd/mm/aaaa")
            regex = new RegExp(/^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/g);
        else if (placeholder == "hh:mm" || placeholder == "hh:mm:ss")
            regex = new RegExp(/^(?:[01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])*$/g);
        //Caso o campo estaja em um formato incorreto é limpado o campo
        if (regex == !undefined && !regex.test(input.val()))
            input.val("");
    }, 200);
};

//Valida se o caracter digitado é válido para o campo data
BDate.validationKeyDate = function (event) {

    var key = (window.event) ? event.keyCode : event.which;
    if (key > 47 && key < 58)
        return true;
    else
        if (BDate.isNavigationKey(key) ||
            event.key === '/' ||
            key === 0)
            return true;
        else
            return false;
};

//Valida se o caracter digitado é válido para o campo time
BDate.validationKeyTime = function (event) {

    var key = (window.event) ? event.keyCode : event.which;

    if (key > 47 && key < 58)
        return true;
    else
        if (BDate.isNavigationKey(key) ||
            event.key === ':' ||
            key === 0)
            return true;
        else
            return false;
};

BDate.isNavigationKey = function (keyCode) {
    return (keyCode === 13 || // enter
        keyCode === 9 || // tab
        keyCode === 8 || // backspace
        keyCode === 46 || // delete
        keyCode === 37 || // left arrow
        keyCode === 39 || // right arrow
        keyCode === 35 || // end
        keyCode === 36	 // home
    );
};

Date.isValidDate = function (day, month, year) {
    var dteDate = new Date(year, month, day, 12, 0, 0);
    return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
};

Date.toDDMMYYYY = function (date) {
    return date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
};

Date.weekShortDays = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
Date.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

Date.prototype.addDays = function (d) {
    this.setDate(this.getDate() + d);
    return this;
};

Date.prototype.addMonths = function (mm) {
    this.setMonth(this.getMonth() + mm);
    return this;
};

Date.prototype.addYears = function (yy) {
    this.setFullYear(this.getFullYear() + yy);
    return this;
};

Date.prototype.addMilliseconds = function (ms) {
    this.setMilliseconds(this.getMilliseconds() + ms);
    return this;
};

// Funçao que formata uma string em DD/MM/YYYY
Date.formatDayMonthYear = function (text, separator) {

    // trim()
    var rsText = text.replace(" ", "");

    if (separator == null || separator == "")
        separator = "/";

    // caso seja um texto vazio, apenas retornar vazio
    if (rsText == "")
        return rsText;

    // caso seja um numero menor que 1, aborta
    if (!isNaN(rsText) && (0 + rsText) < 1)
        return rsText;

    // se for um numero e o tamanho for 1 ou 3
    if (!isNaN(rsText) && (rsText.length == 1 || rsText.length == 3))
        rsText = "0" + rsText;

    // se for um numero e o tamanho for 2
    if (!isNaN(rsText) && rsText.length == 2 && (0 + rsText) <= 31)
        rsText = rsText + separator + Date.getCurrentMonth();

    if (!isNaN(rsText) && rsText.length == 7)
        rsText = "0" + rsText;

    // se for um numero e o tamanho for 4, 6 ou 8
    if (!isNaN(rsText) && (rsText.length == 4 || rsText.length == 6 || rsText.length == 8)) {
        var month = rsText.substring(0, 2);
        if (month.charAt(1) == separator)
            month = "0" + month.charAt(0);
        rsText = month + separator + rsText.substring(2, rsText.length);
    }

    if (rsText.length > 2 && rsText.charAt(1) == separator)
        rsText = "0" + rsText;

    // se o tamanho for maior q 3
    if (rsText.length > 3 && rsText.charAt(2) == separator)
        rsText = rsText.substring(0, 3) + Date.formatMonthYear(rsText.substring(3, rsText.length), separator);

    if (separator != "/")
        rsText = rsText.replace("/", separator);

    return rsText;
};

// Funçao que formata uma string em MM/YYYY
Date.formatMonthYear = function (text, separator) {
    // trim()
    var rsText = text.replace(" ", "");

    if (separator == null || separator == "")
        separator = "/";

    // caso seja um texto vazio, apenas retornar vazio
    if (rsText == "")
        return "";

    // caso seja um numero menor que 1, aborta
    if (!isNaN(rsText) && (0 + rsText) < 1)
        return rsText;

    // se for um numero e o tamanho for 1 ou 5
    if (!isNaN(rsText) && (rsText.length == 1 || rsText.length == 5))
        rsText = "0" + rsText;

    // se for um numero e o tamanho for 2
    if (!isNaN(rsText) && rsText.length == 2)
        rsText = rsText + separator + Date.getCurrentYear();

    // se for um numero e o tamanho for 6
    if (!isNaN(rsText) && rsText.length == 6) {
        let month = rsText.substring(0, 2);
        if (month.charAt(1) == separator)
            month = "0" + month.charAt(0);
        rsText = month + separator + rsText.substring(2, rsText.length);
    }

    if (!isNaN(rsText) && rsText.length == 4)
        rsText = rsText.substring(0, 2) + separator + "20" + rsText.substring(2, rsText.length);

    // se NAO for um numero e o tamanho for 6
    if (isNaN(rsText) && rsText.length == 6)
        rsText = "0" + rsText;

    if (separator != "/")
        rsText = rsText.replace("/", separator);

    return rsText;
};

// Funcao que retorna o ano corrente, retorna YYYY
Date.getCurrentYear = function () {
    var d = new Date();
    return d.getFullYear();
};

// Função que pega o mes corrente, retorna MM
Date.getCurrentMonth = function () {
    var s;
    var d = new Date();
    s = "" + (d.getMonth() + 1);
    if (s.length == 1)
        s = "0" + s;
    return s;
};

// Função que formata hora e minuto
Date.formatHourMinute = function (text, separator) {
    var rsText = text.replace(" ", "");

    if (separator == null || separator == "")
        separator = ":";

    // caso seja um texto vazio, apenas retornar vazio
    if (rsText == "")
        return rsText;

    // caso seja um numero menor que 0, aborta
    if (!isNaN(rsText) && !((0 + rsText) > -1))
        return rsText;

    // se for um numero e o tamanho for 1
    if (!isNaN(rsText) && rsText.length == 1)
        rsText = "0" + rsText + separator + "00";

    // se for um numero e o tamanho for 2
    if (!isNaN(rsText) && rsText.length == 2)
        rsText = rsText + separator + "00";

    // se for um numero e o tamanho for 3, faz uns ajustes e passa adiante
    if (!isNaN(rsText) && rsText.length == 3) {
        rsText = rsText.substr(0, 2) + separator + rsText.substr(2, 1) + "0";
    }

    // se nao for um numero e tem tamanho 3
    if (isNaN(rsText) && rsText.length == 3) {
        if (rsText.charAt(1) == separator)
            rsText = "0" + rsText;

        else if (rsText.charAt(2) == separator)
            rsText = rsText + "00";

        else if (rsText.charAt(0) == separator)
            rsText = "00" + rsText;
    }

    // se tiver 4 caracteres e o segundo for :
    if (rsText.length == 4 && rsText.charAt(1) == separator)
        rsText = "0" + rsText;

    // se tiver 4 caracteres e o terceiro for :
    if (rsText.length == 4 && rsText.charAt(2) == separator)
        rsText = rsText + "0";

    // se tiver 4 caracteres e o terceiro não for :
    if (rsText.length == 4 && rsText.charAt(2) != separator)
        rsText = rsText.substr(0, 2) + separator + rsText.substr(2, 2)

    return rsText;
};

// Função que formata hora minuto e segundo
Date.formatHourMinuteSecond = function (text, separator) {
    // trim()
    var rsText = text.replace(" ", "");

    if (separator == null || separator == "")
        separator = ":";

    // caso seja um texto vazio, apenas retornar vazio
    if (rsText == "")
        return rsText;

    // caso seja um numero menor que 0, aborta
    if (!isNaN(rsText) && !((0 + rsText) > -1))
        return rsText;

    // caso tenha 1, 2 ou 4
    if (rsText.length == 1 || rsText.length == 2 || rsText.length == 4)
        rsText = Date.formatHourMinute(rsText, separator) + separator + "00";

    // caso tenha 5, faz uns ajustes e vai adiante
    if (rsText.length == 5) {
        if (rsText.charAt(2) != separator)
            rsText = rsText.substr(0, 2) + separator + rsText.substr(2, 3)
        else
            rsText = rsText + separator + "00";
    }

    // caso tenha 6, faz ajustes e vai adiante
    if (rsText.length == 6) {
        if (rsText.charAt(2) == separator)
            rsText = rsText.substr(0, 3) + Date.formatHourMinute(rsText.substr(3, 3), separator);
        else
            rsText = Date.formatHourMinute(rsText.substr(0, 4), separator) + rsText.substr(4, 2);
    }

    if (rsText.length == 7 && rsText.charAt(4) == separator)
        rsText = Date.formatHourMinute(rsText.substr(0, 4), separator) + rsText.substr(4, 3);

    if (rsText.length == 7) {
        rsText = Date.formatHourMinute(rsText.substr(0, 5), separator) + rsText.substr(5, 2);

        // caso o ajuste não bastou, faz mais uma tentativa
        if (rsText.length == 7)
            rsText = rsText.substr(0, 3) + Date.formatHourMinute(rsText.substr(3, 4), separator);
    }

    return rsText;
};

export default BDate;