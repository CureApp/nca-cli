'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _directory = require('./directory');

var _directory2 = _interopRequireDefault(_directory);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Node.js project root
 */

var ProjectRootDirectory = function () {
    _createClass(ProjectRootDirectory, null, [{
        key: 'isValid',


        /**
         * Check if the given string is a valid project root directory.
         * Project root must contain node_modules and package.json
         */
        value: function isValid(dirPath) {
            var packageJSONPath = new _path2.default(dirPath, 'package.json').toString();
            var nodeModulePath = new _path2.default(dirPath, 'node_modules').toString();

            // TODO: new File() && new Directory()
            return _file2.default.isValid(packageJSONPath) && _directory2.default.isValid(nodeModulePath);
        }
    }, {
        key: 'assertValid',
        value: function assertValid(dirPath) {
            if (!this.isValid(dirPath)) throw new Error('"' + dirPath + '": package.json or node_modules is missing.');
        }
    }]);

    function ProjectRootDirectory(dirPath) {
        _classCallCheck(this, ProjectRootDirectory);

        this.dir = new _directory2.default(dirPath);
        this.constructor.assertValid(this.dir.toString());
    }

    /**
     * Get path of the given bin command
     */


    _createClass(ProjectRootDirectory, [{
        key: 'getBinPath',
        value: function getBinPath(name) {
            return new _path2.default(this.dir.toString(), 'node_modules', '.bin', name).toString();
        }

        /**
         * Check if the project has the given bin command
         */

    }, {
        key: 'hasBin',
        value: function hasBin(name) {
            var path = this.getBinPath(name);
            return _fs2.default.existsSync(path); // TODO: needs symlink class
        }

        /**
         * Check if the project has the given node module
         */

    }, {
        key: 'isInstalled',
        value: function isInstalled(packageName) {
            var path = new _path2.default(this.dir.toString(), 'node_modules', packageName).toString();
            // TODO: new File() && new Directory()
            return _directory2.default.isValid(path);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.dir.toString();
        }
    }]);

    return ProjectRootDirectory;
}();

exports.default = ProjectRootDirectory;