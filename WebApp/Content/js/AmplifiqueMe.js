import Page from "./Page";

var AmplifiqueMe = {};

AmplifiqueMe.initSurvey = function (surveyId) {
    if (typeof AmplSurvey !== 'undefined' &&
        !AmplifiqueMe.ignored.includes(Page.activeRole)) {        

        window.amplData = {
            email: Benner.Page.userEmail, // TODO: Required. Is the unique identifier.
            name: Benner.Page.userFullName, //TODO: Optional. To set name of customer.
            phone: Benner.Page.phone, //TODO: Optional. To set phone of customer
            company: Benner.Page.client, //TODO: Optional. To set company of customer
            survey: surveyId,// This is your survey identifier
            custom_fields: {
                usuario: Benner.Page.userName,
                versao: Benner.Page.systemVersion,
                produto: Benner.Page.systemName.toUpperCase(),
                cliente: Benner.Page.client,
                origem: 'WES',
                papel: Benner.Page.activeRole,
                cid: Benner.Page.cid,
                versaotec: Benner.Page.wesVersion,
            },
            callback: function (data) { } //TODO: This is a callback method called when a user reply or dismiss an request.

        }

        AmplSurvey.run('run')
    }
};

AmplifiqueMe.initGlobalNps = function () {

    switch (Benner.Page.systemName.toUpperCase()) {
        case 'CORPORATIVO':
            AmplifiqueMe.initSurvey('629f71e335f9032b339d59b9');
            break;
        case 'PROCESSOS':
            AmplifiqueMe.initSurvey('629f711335f9032b339d4991');
            break;
        case 'RH':
            AmplifiqueMe.initSurvey('629f71e335f9032b339d5999');
            break;
        case 'AG':
            AmplifiqueMe.initSurvey('629f71e335f9032b339d59ec');
            break;
        case 'MG':
            AmplifiqueMe.initSurvey('629f71e335f9032b339d5a03');
            break;
        case 'LOGISTICA':
            AmplifiqueMe.initSurvey('629f71e435f9032b339d5a3e');
            break;
        default:
            AmplifiqueMe.initSurvey('61c0e19bdf8715694c024e90');
            break;
    }
};

export default AmplifiqueMe;