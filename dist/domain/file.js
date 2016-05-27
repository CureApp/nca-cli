'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
    _createClass(File, null, [{
        key: 'isValid',
        value: function isValid(filePath) {
            return _fs2.default.existsSync(filePath) && _fs2.default.statSync(filePath).isFile();
        }
    }, {
        key: 'assertValid',
        value: function assertValid(filePath) {
            if (!this.isValid(filePath)) throw new Error('"' + filePath + '": No such file.');
        }
    }]);

    function File(filePath) {
        _classCallCheck(this, File);

        this.filePath = filePath;
        this.constructor.assertValid(this.filePath);
    }

    _createClass(File, [{
        key: 'toString',
        value: function toString() {
            return this.filePath;
        }
    }]);

    return File;
}();

exports.default = File;