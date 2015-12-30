/**
 * rcmuserCore.getNamespaceRepeatString
 */
angular.module('rcmuserCore').factory(
    'getNamespaceRepeatString', function () {

        return function (namespace, repeatStr, namspaceDelimiter) {
            if (!namspaceDelimiter) {
                namspaceDelimiter = ".";
            }

            var n = (namespace.split(namspaceDelimiter).length - 1);
            var a = [];
            while (a.length < n) {
                a.push(repeatStr);
            }
            return a.join('');
        }
    }
);
