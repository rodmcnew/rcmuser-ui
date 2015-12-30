/**
 * rcmuserCore.RcmUserHttp
 */
angular.module('rcmuserCore').factory(
    'RcmUserHttp',
    [
        '$log',
        '$http',
        'RcmUserResult',
        'RcmResults',
        function ($log, $http, RcmUserResult, RcmResults) {

            var RcmUserHttp = function () {

                var self = this;
                self.http = $http;
                self.comErrorMessage = 'There was an error talking to the server: ';
                self.includeSuccessAlerts = false;
                self.loading = 0;
                self.alerts = new RcmResults();

                self.loadingOn = function () {

                    self.loading++;
                };

                self.loadingOff = function () {

                    if (self.loading > 0) {

                        self.loading--;
                    }
                };

                self.execute = function (config, onSuccess, onFail) {

                    self.loadingOn();
                    self.alerts.clear();

                    self.http(config)
                        .success(
                            function (data, status, headers, config) {

                                //$log.log('call-success');
                                // if is result object
                                if (typeof(data.code) !== 'undefined' && typeof(data.messages) !== 'undefined') {

                                    if (data.code < 1) {

                                        //$log.log('result-fail');
                                        self.alerts.add(data);

                                        if (typeof(onFail) === 'function') {

                                            onFail(data);
                                        }

                                        self.loadingOff();
                                        return;
                                    }

                                    if (self.includeSuccessAlerts) {

                                        if (data.messages.length == 0) {
                                            //$log.log('default-success-alert');
                                            data.messages.push("Success!")
                                        }

                                        self.alerts.add(data);
                                    }
                                } else {

                                    $log.error('Result object not returned: ', data);
                                    var failResult = new RcmUserResult(
                                        0,
                                        ['Error: Invalid result returned from server.'],
                                        data
                                    );

                                    self.alerts.add(failResult);
                                }

                                if ((typeof(onSuccess) === 'function')) {

                                    onSuccess(data, config);
                                }

                                self.loadingOff();
                            }
                        )
                        .error(
                            function (data, status, headers, config) {

                                //$log.log('call-error');

                                var failResult = new RcmUserResult(
                                    0,
                                    [self.comErrorMessage + status],
                                    data
                                );

                                $log.error(failResult);

                                self.alerts.add(failResult);

                                if (typeof(onFail) === 'function') {

                                    onFail(failResult);
                                }

                                self.loadingOff();
                            }
                        );
                }
            };

            return RcmUserHttp;
        }
    ]
);
