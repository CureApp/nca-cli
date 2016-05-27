'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _projectRootDirectory = require('./project-root-directory');

var _projectRootDirectory2 = _interopRequireDefault(_projectRootDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalNcaFile = function () {
    _createClass(LocalNcaFile, null, [{
        key: 'isValid',
        value: function isValid(rootDir) {
            return rootDir.isInstalled('node-circleci-autorelease') && rootDir.hasBin('nca');
        }
    }, {
        key: 'assertValid',
        value: function assertValid(filePath) {
            if (!this.isValid(filePath)) throw new Error('"' + filePath + '": node-circleci-autorelease is not installed.');
        }
    }]);

    function LocalNcaFile(dir) {
        _classCallCheck(this, LocalNcaFile);

        this.rootDir = new _projectRootDirectory2.default(dir);
        this.constructor.assertValid(this.rootDir);
    }

    _createClass(LocalNcaFile, [{
        key: 'execute',
        value: function execute(argv) {

            var binPath = this.rootDir.getBinPath('nca');
            // $FlowIssue - requiring non-literal
            var nca = require(binPath);
            nca.run(argv);
        }
    }]);

    return LocalNcaFile;
}();

exports.default = LocalNcaFile;