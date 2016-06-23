/**
 * rcmuserAdminUserRoleApp.rcmuserAdminUserRole
 */
angular.module('rcmuserAdminUserRoleApp').controller(
    'rcmuserAdminUserRole',
    [
        '$scope',
        '$uibModal',
        'rcmUserConfig',
        'RcmUserHttp',
        'RcmUserResult',
        'RcmResults',
        function ($scope, $uibModal, rcmUserConfig, RcmUserHttp, RcmUserResult, RcmResults) {
            var self = this;

            self.url = {
                user: rcmUserConfig.url.user,
                roles: rcmUserConfig.url.rulesByroles
            };

            self.rcmUserHttp = new RcmUserHttp();

            $scope.user = {};

            $scope.alerts = self.rcmUserHttp.alerts;
            $scope.loading = self.rcmUserHttp.loading;

            $scope.oneAtATime = false;

            $scope.getUser = function(userId) {
                // @todo Get a user VIA API
                $scope.user = {};
            }
        }
    ]
);
