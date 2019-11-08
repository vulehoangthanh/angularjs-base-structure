(function(angular) {
    'use strict';
    var app = angular.module("myApp", ['templates', 'ngStorage', 'configModule', "ui.router", 'summernote', 'readableTime'
        , 'ui.bootstrap.datetimepicker', 'ui.dateTimeInput'
        , 'ngCookies'
        , 'AppRouterModule'
        , 'ExampleModule'
    ]);

    app.config(function($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$state', '$localStorage', '$cookieStore', function ($q, $state, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (angular.isDefined($localStorage.token)) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {

                    if (response.status === 401) {
                        delete $localStorage.token;
                        delete $localStorage.user;
                        delete $localStorage.setting;
                        $state.go('login');
                    }

                    if(response.status === 403) {
                        setTimeout(function() {
                            $.notify({
                                title: '',
                                icon: 'icon fa fa-check',
                                message: "Bạn không có quyền truy cập"
                            },{
                                type: 'error',
                                z_index: 999999
                            });
                        }, 200);
                    }

                    if(response.status === 400) {
                        if(response.data.error && (response.data.error == 'token_not_provided' || response.data.error == 'token_invalid')) {
                            delete $localStorage.token;
                            delete $localStorage.user;
                            delete $localStorage.setting;
                            $state.go('login');
                        }
                    }

                    return $q.reject(response);
                }
            };
        }]);
    });

})(window.angular);
