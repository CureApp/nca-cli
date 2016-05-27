'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var ProjectRootDirectory = function () {
    _createClass(ProjectRootDirectory, null, [{
        key: 'isValid',
        value: function isValid(dirPath) {
            function _ref(_id) {
                if (!(typeof _id === 'boolean')) {
                    throw new TypeError('Function return value violates contract.\n\nExpected:\nbool\n\nGot:\n' + _inspect(_id));
                }

                return _id;
            }

            if (!(typeof dirPath === 'string')) {
                throw new TypeError('Value of argument "dirPath" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(dirPath));
            }

            var packageJSONPath = new _path2.default(dirPath, 'package.json').toString();
            var nodeModulePath = new _path2.default(dirPath, 'node_modules').toString();

            // TODO: new File() && new Directory()
            return _ref(_file2.default.isValid(packageJSONPath) && _directory2.default.isValid(nodeModulePath));
        }
    }, {
        key: 'assertValid',
        value: function assertValid(dirPath) {
            if (!(typeof dirPath === 'string')) {
                throw new TypeError('Value of argument "dirPath" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(dirPath));
            }

            if (!this.isValid(dirPath)) throw new Error('"' + dirPath + '": package.json or node_modules is missing.');
        }
    }]);

    function ProjectRootDirectory(dirPath) {
        _classCallCheck(this, ProjectRootDirectory);

        if (!(typeof dirPath === 'string')) {
            throw new TypeError('Value of argument "dirPath" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(dirPath));
        }

        this.dir = new _directory2.default(dirPath);
        this.constructor.assertValid(this.dir.toString());
    }

    _createClass(ProjectRootDirectory, [{
        key: 'getBinPath',
        value: function getBinPath(name) {
            function _ref2(_id2) {
                if (!(typeof _id2 === 'string')) {
                    throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id2));
                }

                return _id2;
            }

            if (!(typeof name === 'string')) {
                throw new TypeError('Value of argument "name" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(name));
            }

            return _ref2(new _path2.default(this.dir.toString(), 'node_modules', '.bin', name).toString());
        }
    }, {
        key: 'hasBin',
        value: function hasBin(name) {
            function _ref3(_id3) {
                if (!(typeof _id3 === 'boolean')) {
                    throw new TypeError('Function return value violates contract.\n\nExpected:\nbool\n\nGot:\n' + _inspect(_id3));
                }

                return _id3;
            }

            if (!(typeof name === 'string')) {
                throw new TypeError('Value of argument "name" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(name));
            }

            var path = this.getBinPath(name);
            return _ref3(_fs2.default.existsSync(path)); // TODO: needs symlink class
        }
    }, {
        key: 'isInstalled',
        value: function isInstalled(packageName) {
            function _ref4(_id4) {
                if (!(typeof _id4 === 'boolean')) {
                    throw new TypeError('Function return value violates contract.\n\nExpected:\nbool\n\nGot:\n' + _inspect(_id4));
                }

                return _id4;
            }

            if (!(typeof packageName === 'string')) {
                throw new TypeError('Value of argument "packageName" violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(packageName));
            }

            var path = new _path2.default(this.dir.toString(), 'node_modules', packageName).toString();
            // TODO: new File() && new Directory()
            return _ref4(_directory2.default.isValid(path));
        }
    }, {
        key: 'toString',
        value: function toString() {
            function _ref5(_id5) {
                if (!(typeof _id5 === 'string')) {
                    throw new TypeError('Function return value violates contract.\n\nExpected:\nstring\n\nGot:\n' + _inspect(_id5));
                }

                return _id5;
            }

            return _ref5(this.dir.toString());
        }
    }]);

    return ProjectRootDirectory;
}();

exports.default = ProjectRootDirectory;

function _inspect(input, depth) {
    var maxDepth = 4;
    var maxKeys = 15;

    if (depth === undefined) {
        depth = 0;
    }

    depth += 1;

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'void';
    } else if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
        return typeof input === 'undefined' ? 'undefined' : _typeof(input);
    } else if (Array.isArray(input)) {
        if (input.length > 0) {
            var _ret = function () {
                if (depth > maxDepth) return {
                        v: '[...]'
                    };

                var first = _inspect(input[0], depth);

                if (input.every(function (item) {
                    return _inspect(item, depth) === first;
                })) {
                    return {
                        v: first.trim() + '[]'
                    };
                } else {
                    return {
                        v: '[' + input.slice(0, maxKeys).map(function (item) {
                            return _inspect(item, depth);
                        }).join(', ') + (input.length >= maxKeys ? ', ...' : '') + ']'
                    };
                }
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        } else {
            return 'Array';
        }
    } else {
        var keys = Object.keys(input);

        if (!keys.length) {
            if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
                return input.constructor.name;
            } else {
                return 'Object';
            }
        }

        if (depth > maxDepth) return '{...}';
        var indent = '  '.repeat(depth - 1);
        var entries = keys.slice(0, maxKeys).map(function (key) {
            return (/^([A-Z_$][A-Z0-9_$]*)$/i.test(key) ? key : JSON.stringify(key)) + ': ' + _inspect(input[key], depth) + ';';
        }).join('\n  ' + indent);

        if (keys.length >= maxKeys) {
            entries += '\n  ' + indent + '...';
        }

        if (input.constructor && input.constructor.name && input.constructor.name !== 'Object') {
            return input.constructor.name + ' {\n  ' + indent + entries + '\n' + indent + '}';
        } else {
            return '{\n  ' + indent + entries + '\n' + indent + '}';
        }
    }
}