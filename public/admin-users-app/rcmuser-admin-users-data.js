/**
 * rcmuserAdminUsersApp.rcmuserAdminUsersData
 */
angular.module('rcmuserAdminUsersApp').factory(
    'rcmuserAdminUsersData',
    [
        'rcmUserConfig',
        function (rcmUserConfig) {

            var self = this;

            self.url = rcmUserConfig.url;

            self.rolePropertyId = '<?php echo $rolePropertyId; ?>';

            self.availableStates = [
                'enabled',
                'disabled'
            ];

            return self;
        }
    ]
);
