import 'babel-polyfill';
let ace = require('brace');
require('brace/ext/searchbox');
require('brace/mode/html');
require('brace/mode/xml');
require('brace/mode/razor');
require('brace/mode/sql');
require('brace/mode/json');
require('brace/mode/text');
require('brace/mode/python');
require('brace/mode/javascript');
require('brace/mode/css');
require('brace/snippets/razor');
require('brace/snippets/xml');
require('brace/snippets/sql');
require('brace/snippets/text');
require('brace/snippets/html');
require('brace/snippets/json');
require('brace/snippets/javascript');
require('brace/snippets/python');
require('brace/snippets/css');
require('brace/theme/chrome');
require("brace/ext/language_tools");

let langTools = ace.acequire('ace/ext/language_tools');

export default {
    ace: ace,
    langTools: langTools
};