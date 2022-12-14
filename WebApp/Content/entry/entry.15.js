// ---------------------------------------------- //
//                      Style                     //
// ---------------------------------------------- //
import 'font-awesome/css/font-awesome.css';
import 'simple-line-icons-webfont/dist/css/simple-line-icons.css';
import '../sass/bootstrap.scss';
import 'toastr/build/toastr.css';
import 'fancybox/dist/css/jquery.fancybox.css';
import 'fancybox/dist/helpers/css/jquery.fancybox-thumbs.css';
import 'jquery-minicolors/jquery.minicolors.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'bootstrap-tourist/bootstrap-tourist.css';
import 'bootstrap-multiselect/dist/css/bootstrap-multiselect.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'ace-diff/dist/ace-diff.min.css';
import 'datatables-bootstrap/css/dataTables.bootstrap.css';
import '../assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.css';
import '../assets/plugins/bootstrap-fileinput/bootstrap-fileinput.css';
import '../assets/plugins/select2/css/select2.css';
import '../assets/plugins/select2/css/select2-bootstrap.min.css';
import '../assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css';
import '../assets/plugins/typeahead/typeahead.css';
import '../assets/plugins/amcharts/plugins/export/export.css';
import '../assets/plugins/bootstrap-tabdrop/css/tabdrop.css';
import '../assets/plugins/bootstrap-daterangepicker/daterangepicker.css';
import '../sass/global/components.scss';
import '../sass/global/plugins.scss';
import '../assets/css/layout.css';
import '../css/flaticon.css';
import '../css/fonts.css';
import '../css/wes.css';
import '../css/forms.css';
import '../css/grids.css';
import '../css/notifications.css';
import '../css/viewEditors.css';
import '../css/searcher.css';
import '../css/pivottable.css';
import "../css/chatbot.css";

// ---------------------------------------------- //
//                   JavaScript                   //
// ---------------------------------------------- //
import "core-js";
import 'bootstrap';
import 'bootstrap-hover-dropdown';
import 'jquery-slimscroll';
import 'autonumeric';
import '../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker';
import '../assets/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min';
import '../assets/plugins/select2/js/select2';
import '../assets/plugins/select2/js/i18n/pt-BR';
import '../assets/plugins/typeahead/handlebars.min';
import '../assets/plugins/typeahead/typeahead.bundle';
import '../assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker';
import '../assets/plugins/bootstrap-contextmenu/bootstrap-contextmenu';
import '../assets/plugins/amcharts/amcharts';
import 'amcharts3/amcharts/funnel';
import 'amcharts3/amcharts/gantt';
import 'amcharts3/amcharts/gauge';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/radar';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/xy';
import 'amcharts3/amcharts/lang/pt';
import 'amcharts3/amcharts/plugins/export/export';
import 'amcharts3/amcharts/plugins/export/lang/pt';
import 'amcharts3/amcharts/plugins/dataloader/dataloader';
import 'amcharts3/amcharts/themes/black';
import 'amcharts3/amcharts/themes/chalk';
import 'amcharts3/amcharts/themes/dark';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/themes/patterns';
import 'bootstrap-tourist/bootstrap-tourist';
import 'bootstrap-wizard/jquery.bootstrap.wizard';
import 'easy-pie-chart/dist/jquery.easypiechart';
import 'jquery-validation/dist/jquery.validate';
import 'inputmask/dist/min/jquery.inputmask.bundle.min';
import 'blockui-npm';
import 'datatables';
import 'datatables-bootstrap/js/dataTables.bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.options.autoDispose = true;
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH81582790");

window.am4core = am4core;
window.am4charts = am4charts;

import 'sweetalert';
import 'dropzone';
import Layout from '../assets/scripts/layout';
import App from '../assets/scripts/app';

window.App = App;
window.Layout = Layout;

import Page from '../js/Page';
import Form from '../js/Form';
import HorizontalMenu from '../js/HorizontalMenu';
import Calendar from '../js/Calendar';
import ModalPage from '../js/ModalPage';
import ModalMessage from '../js/ModalMessage';
import MessagePanel from '../js/MessagePanel';
import Search from '../js/Search';
import AsyncProcesses from '../js/AsyncProcesses';
import Control from '../js/Control';
import Sidebar from '../js/Sidebar';
import Widget from '../js/Widget';
import Development from '../js/Development';
import AutoComplete from '../js/AutoComplete';
import AmChartsWidget from '../js/AmChartsWidget';
import SourceEditor from '../js/SourceEditor';
import PivotTable from '../js/PivotTable';
import TextEditor from '../js/TextEditor';
import Tile from '../js/Tile';
import Services from '../js/Services';
import Grid from '../js/Grid';
import WebTour from '../js/WebTour';
import SilverlightScript from '../js/SilverlightScript';
import MapWes from '../js/Map';
import ChatBot from '../js/ChatBot';
import Searcher from '../js/Searcher';
import Http from '../js/Http';
import AmplifiqueMe from '../js/AmplifiqueMe';
import MultiSelect from '../js/MultiSelect';
import ShowHandles from '../js/ShowHandles';
import BennerDropzone from '../js/BennerDropzone';

var Benner = {};
Benner.Page = Page;
Benner.Form = Form;
Benner.FormWidget = Form;
Benner.HorizontalMenu = HorizontalMenu;
Benner.Calendar = Calendar;
Benner.ModalPage = ModalPage;
Benner.ModalMessage = ModalMessage;
Benner.MessagePanel = MessagePanel;
Benner.Search = Search;
Benner.AsyncProcesses = AsyncProcesses;
Benner.Control = Control;
Benner.Sidebar = Sidebar;
Benner.Development = Development;
Benner.AutoComplete = AutoComplete;
Benner.AmChartsWidget = AmChartsWidget;
Benner.SourceEditor = SourceEditor;
Benner.PivotTable = PivotTable;
Benner.Widget = Widget;
Benner.WidgetCommandsBar = Widget;
Benner.TextEditor = TextEditor;
Benner.Tile = Tile;
Benner.Services = Services;
Benner.Grid = Grid;
Benner.WebTour = WebTour;
Benner.Silverlight = SilverlightScript;
Benner.Map = MapWes;
Benner.ChatBot = ChatBot;
Benner.Searcher = Searcher;
Benner.Http = Http;
Benner.AmplifiqueMe = AmplifiqueMe;
Benner.MultiSelect = MultiSelect;
Benner.ShowHandles = ShowHandles;
Benner.BennerDropzone = BennerDropzone;

import DataSourceEditor from '../apps/Datasource/Editor';
import Login from '../apps/Login';
import CustomField from '../apps/CustomField';
import ArtifactsDiff from '../apps/ArtifactsDiff';
import CustomLookup from '../apps/CustomLookup';
import AmChartsAttributes from '../apps/AmChartsAttributes';
import AmChartsSeries from '../apps/AmChartsSeries';
import SqlExplorer from '../apps/SqlExplorer';
Benner.Apps = {};
Benner.Apps.DataSourceEditor = DataSourceEditor;
Benner.Apps.Login = Login;
Benner.Apps.CustomField = CustomField;
Benner.Apps.ArtifactsDiff = ArtifactsDiff;
Benner.Apps.CustomLookup = CustomLookup;
Benner.Apps.AmChartsAttributes = AmChartsAttributes;
Benner.Apps.AmChartsSeries = AmChartsSeries;
Benner.Apps.SqlExplorer = SqlExplorer;

window.Benner = Benner;
window.WebTour = WebTour;
window.Login = Login;

require('~/content/js/Extensions.js');
require('~/content/js/Hack.js');

window.Bloodhound = require('bloodhound-js');
window.toastr = require('toastr');
window.$ = window.jQuery = $;
require('fancybox')($);
require('bootstrap-multiselect');
require('bootstrap-tagsinput/dist/bootstrap-tagsinput');
window._ = _;
require('jquery-ui/ui/widgets/sortable');
require('../assets/plugins/bootstrap-daterangepicker/daterangepicker');
require('../assets/plugins/bootstrap-tabdrop/js/bootstrap-tabdrop');
window.bootbox = require('bootbox');
window.moment = require('moment');
window.moment.locale('pt-BR');

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const requireComponent = require.context(
    '../components', true, /[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = _.upperFirst(_.camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')));

    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    );
});
window.Vue = Vue;
window.Vuex = Vuex;

const requireCustomEntries = require.context(
    './', false, /entry.(20|30|40|50).js$/
);

requireCustomEntries.keys().forEach(fileName => {
    requireCustomEntries(fileName);
});

const requireNpsEntries = require.context(
    '~/content/js/', false, /nps.(15|20|30|40|50).json$/
);

var npsIgnoreList = [];
var requiredNpsEntries = requireNpsEntries.keys();
for (var i = 0; i < requiredNpsEntries.length; i++) {
    var r = requireNpsEntries(requiredNpsEntries[i]);
    npsIgnoreList = npsIgnoreList.concat(r.ignored);
}

Benner.AmplifiqueMe.ignored = npsIgnoreList;