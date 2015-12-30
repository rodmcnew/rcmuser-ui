/**
 * rcmuserAdminAclApp.resourceFilter
 */
angular.module('rcmuserAdminAclApp').filter(
    'resourceFilter', function () {

        var compareStr = function (stra, strb) {
            stra = ("" + stra).toLowerCase();
            strb = ("" + strb).toLowerCase();

            return stra.indexOf(strb) !== -1;
        };

        return function (input, query) {
            if (!query) {
                return input
            }
            var result = [];

            angular.forEach(
                input, function (resource) {
                    if (compareStr(resource.resource.resourceId, query)
                        || compareStr(resource.resource.name, query)) {
                        result.push(resource);
                    }
                }
            );

            return result;
        };
    }
);
