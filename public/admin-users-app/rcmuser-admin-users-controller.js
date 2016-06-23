/**
 * rcmuserAdminUsersApp.rcmuserAdminUsers
 */
angular.module('rcmuserAdminUsersApp').controller(
    'rcmuserAdminUsers',
    [
        '$scope',
        '$log',
        '$uibModal',
        'RcmUserHttp',
        'RcmUserResult',
        'RcmResults',
        'rcmuserAdminUsersData',
        function (
            $scope,
            $log,
            $uibModal,
            RcmUserHttp,
            RcmUserResult,
            RcmResults,
            rcmuserAdminUsersData
        ) {
            var self = this;

            $scope.rcmUserHttp = new RcmUserHttp();

            $scope.userQuery = '';

            $scope.availableStates = [
                'enabled',
                'disabled'
            ];

            self.getUsers = function (onSuccess, onFail) {

                var config = {
                    method: 'GET',
                    url: rcmuserAdminUsersData.url.users
                };

                $scope.rcmUserHttp.execute(config, onSuccess, onFail);
            };

            self.getRoles = function (onSuccess, onFail) {

                var config = {
                    method: 'GET',
                    url: rcmuserAdminUsersData.url.role
                };

                $scope.rcmUserHttp.execute(config, onSuccess, onFail);
            };

            self.getValidUserStates = function (onSuccess, onFail) {

                var config = {
                    method: 'GET',
                    url: rcmuserAdminUsersData.url.validUserStates
                };

                $scope.rcmUserHttp.execute(config, onSuccess, onFail);
            };

            // User
            $scope.showMessages = false;
            self.getUsers(
                function (data, status) {

                    $scope.users = data.data;
                    $scope.messages = data.messages;
                }
            );

            // User Roles
            self.getRoles(
                function (data, status) {

                    $scope.roles = data.data;
                    $scope.messages = data.messages;
                }
            );

            // valid user states
            self.getValidUserStates(
                function (data, status) {

                    $scope.availableStates = data.data;
                }
            );

            $scope.rolePropertyId = rcmuserAdminUsersData.rolePropertyId;

            $scope.oneAtATime = false;

            $scope.addUser = function () {

                var user = {
                    username: '',
                    password: null,
                    state: 'disabled',
                    email: '',
                    name: '',
                    properties: {},
                    isNew: true
                };

                user.properties[$scope.rolePropertyId] = [];

                $scope.users.unshift(user);

                // clear filter
                $scope.userQuery = '';
            }
        }
    ]
);
