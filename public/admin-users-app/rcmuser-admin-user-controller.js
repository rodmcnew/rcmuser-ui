/**
 * rcmuserAdminUsersApp.rcmuserAdminUser
 */
angular.module('rcmuserAdminUsersApp').controller(
    'rcmuserAdminUser',
    [
        '$scope',
        '$log',
        'RcmUserHttp',
        'RcmUserResult',
        'RcmResults',
        'rcmuserAdminUsersData',
        'getNamespaceRepeatString',
        function ($scope, $log, RcmUserHttp, RcmUserResult, RcmResults, rcmuserAdminUsersData, getNamespaceRepeatString) {

            var self = this;
            self.url = rcmuserAdminUsersData.url;
            $scope.rolePropertyId = rcmuserAdminUsersData.rolePropertyId;

            $scope.rcmUserHttp = new RcmUserHttp();

            $scope.getNamespaceRepeatString = getNamespaceRepeatString;

            $scope.showEdit = false;

            $scope.defaultRoles = [];

            $scope.orgUser = angular.copy($scope.user);

            $scope.isDefaultRole = function (roleId) {

                var index = $scope.defaultRoles.indexOf(roleId);

                if (index !== -1) {

                    return true;
                }

                return false;
            };

            $scope.openEditUser = function () {
                var onSuccess = function (data, status) {

                    $scope.showEdit = true;
                    $scope.user = data.data;
                };

                self.getUser(onSuccess, $scope.user);
            };

            $scope.openRemoveUser = function () {
                // show dialog
            };

            $scope.addRole = function (roleId) {

                if (typeof($scope.user.properties[$scope.rolePropertyId]) === 'undefined') {

                    $scope.user.properties[$scope.rolePropertyId] = [];
                }

                if ($scope.user.properties[$scope.rolePropertyId].indexOf(roleId) === -1) {

                    $scope.user.properties[$scope.rolePropertyId].push(roleId);
                }

            };

            $scope.removeRole = function (roleId) {

                var index = $scope.user.properties[$scope.rolePropertyId].indexOf(
                    roleId
                );

                if (index === -1) {

                    return;
                }

                $scope.user.properties[$scope.rolePropertyId].splice(index, 1);
            };

            /* <USER> */
            $scope.createUser = function (user) {

                var onSuccess = function (data, status) {

                    $scope.user = data.data;
                };

                self.createUser($scope.user, onSuccess);
            };

            $scope.updateUser = function (user) {

                var onSuccess = function (data, status) {

                    $scope.user = data.data;
                };

                self.updateUser($scope.user, onSuccess);
            };

            $scope.removeUser = function (user) {

                var onSuccess = function (data, status) {

                    if (typeof($scope.users.splice) === 'function') {
                        $scope.users.splice($scope.index, 1);
                    } else {
                        $log.error(
                            'Expected array, user could not be properly removed'
                        );
                    }

                    delete $scope.user;
                };

                self.removeUser($scope.user, onSuccess);
            };

            $scope.resetUser = function () {
                $scope.user = angular.copy($scope.orgUser);
            };

            $scope.cancelCreateUser = function () {
                // @todo need pop this from users in parent scope
                $scope.user = $scope.users.splice($scope.index, 1);
            };

            // API CALLS
            self.createUser = function (user, onSuccess) {

                var config = {
                    method: 'POST',
                    url: self.url.users,
                    data: user
                };

                $scope.rcmUserHttp.execute(config, onSuccess);
            };

            self.updateUser = function (user, onSuccess) {

                var config = {
                    method: 'PUT',
                    url: self.url.users + '/' + user.id,
                    data: user
                };

                $scope.rcmUserHttp.execute(config, onSuccess);
            };

            self.removeUser = function (user, onSuccess) {

                var config = {
                    method: 'DELETE',
                    url: self.url.users + '/' + user.id,
                    data: user
                };

                $scope.rcmUserHttp.execute(config, onSuccess);
            };

            self.getUser = function (onSuccess, user) {

                var config = {
                    method: 'GET',
                    url: self.url.users + '/' + user.id
                };

                $scope.rcmUserHttp.execute(config, onSuccess);
            };
            /* </USER> */

            self.getDefaultUserRoles = function (onSuccess) {

                var config = {
                    method: 'GET',
                    url: rcmuserAdminUsersData.url.defaultUserRoles
                };

                $scope.rcmUserHttp.execute(config, onSuccess);
            };

            self.getDefaultUserRoles(
                function (data, status) {

                    $scope.defaultRoles = data.data;
                }
            );

        }
    ]
);
