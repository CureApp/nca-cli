'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Directory
 */

var Directory = function () {
    _createClass(Directory, null, [{
        key: 'isValid',


        /**
         * check the given string is a valid directory
         */
        value: function isValid(dirPath) {
            return _fs2.default.existsSync(dirPath) && _fs2.default.statSync(dirPath).isDirectory();
        }
    }, {
        key: 'assertValid',
        value: function assertValid(dirPath) {
            if (!this.isValid(dirPath)) throw new Error('"' + dirPath + '": No such directory.');
        }
    }]);

    function Directory(dirPath) {
        _classCallCheck(this, Directory);

        this.dirPath = dirPath;
        this.constructor.assertValid(this.dirPath);
    }

    _createClass(Directory, [{
        key: 'toString',
        value: function toString() {
            return this.dirPath;
        }
    }]);

    return Directory;
}();

exports.default = Directory;