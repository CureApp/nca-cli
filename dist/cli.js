#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = runNca;

var _localNcaFile = require('./domain/local-nca-file');

var _localNcaFile2 = _interopRequireDefault(_localNcaFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function runNca(cwd, argv) {

    var localNca = void 0;

    try {
        localNca = new _localNcaFile2.default(cwd);
    } catch (e) {
        console.error(NCA_NOT_INSTALLED);
        return process.exit(1);
    }

    localNca.execute(argv);
}
/*eslint no-console: 0 */


var NCA_NOT_INSTALLED = '\n-------------------------------------------------------------------\n    node-circleci-autorelease is not installed locally.\n\n        npm install --save-dev node-circleci-autorelease\n\n    If already isntalled, make sure you are in the project root.\n-------------------------------------------------------------------\n';

if (require.main === module) runNca(process.cwd(), process.argv.slice(2));