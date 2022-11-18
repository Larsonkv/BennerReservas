var MessagePanel = (function () {
    /// <summary>
    ///     Notify the user about the result of an operation.
    ///     The page that calls this function must have an empty div with a valid ID.
    /// </summary>
    /// <param name="div" type="string">Target div ID</param>
    /// <param name="type" type="string">Notification message type. Valid options: success | info | warning | danger</param>
    /// <param name="text" type="string">Notification message text</param>
    /// <param name="pre" type="Boolean">Preformatted text</param>
    let show = function (type, text, idMessagePanel, pre, targetDiv) {
        if ($('#' + idMessagePanel).length > 0) {
			clear(targetDiv);
        }
        if (idMessagePanel === undefined) {
            idMessagePanel = 'notification';
        }

        var html = "<div id='" + idMessagePanel + "' class='alert alert-dismissable";

        if (type == "success" || type == "info" || type == "warning" || type == "danger") {
            html += " alert-" + type;
        }

        if (pre) {
            html += "' style='white-space: pre-wrap;'"
        }

        html += "'><button type='button' class='close' data-dismiss='alert'></button>" + text + "</div>";

		if (!targetDiv)
			$('.page-bar').after(html);
		else
			$(targetDiv).append(html);
    };

	let clear = function (targetDiv) {
		$(targetDiv).find('.close').click();
    };

    return {
        show: show,
		clear: clear
    };
}
)();

export default MessagePanel;