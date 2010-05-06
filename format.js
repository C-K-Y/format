//
// format, printf-like string formatting for JavaScript
// github.com/samsonjs/format
//
// Copyright 2010 Sami Samhuri <sami.samhuri@gmail.com>
// ISC license
//

var sys = require('sys');

function $args(args) {
    return Array.prototype.slice.call(args);
}

exports.extendNativeStrings = function() {
    String.prototype.printf = function(/* ... */) {
        var args = $args(arguments);
        if (args[0] !== this) args.unshift(this);
        sys.puts(exports.format.apply(this, args));
    };
    String.prototype.format = function(/* ... */) {
        var args = $args(arguments);
        if (args[0] !== this) args.unshift(this);
        return exports.format.apply(this, args);
    };
};

exports.printf = function(/* ... */) {
    sys.puts(exports.format.apply(this, arguments));
};

exports.format = function(format) {
    var argIndex = 1 // skip initial format argument
      , args = $args(arguments)
      , i = 0
      , n = format.length
      , result = ''
      , c
      , escaped = false
      , arg
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
              var digits = '';
              while (format[i].match(/\d/))
                  digits += format[i++];
              return digits.length > 0 ? parseInt(digits) : null;
          }
      ;
    for (; i < n; ++i) {
        c = format[i];
        if (escaped) {
            escaped = false;
            precision = slurpNumber();
            switch (c) {
            case 'b': // number in binary
                result += parseInt(nextArg(), 10).toString(2);
                break;
            case 'c': // character
                arg = nextArg();
                if (typeof arg === 'string' || arg instanceof String)
                    result += arg;
                else
                    result += String.fromCharCode(parseInt(arg, 10));
                break;
            case 'd': // number in decimal
                result += parseInt(nextArg(), 10);
                break;
            case 'f': // floating point number
                result += parseFloat(nextArg()).toFixed(precision || 6);
                break;
            case 'o': // number in octal
                result += '0' + parseInt(nextArg(), 10).toString(8);
                break;
            case 's': // string
                result += nextArg();
                break;
            case 'x': // lowercase hexadecimal
                result += '0x' + parseInt(nextArg(), 10).toString(16);
                break;
            case 'X': // uppercase hexadecimal
                result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
                break;
            default:
                result += c;
                break;
            }
        } else if (c === '%') {
            escaped = true;
        } else {
            result += c;
        }
    }
    return result;
};
