(function(angular) {
    'use strict';
    angular.module('MyService',[])
        .value('CACHE_SERVICE', {})
        .factory('ExampleService', function($http, config) {
            return {
                functionName: function () {
                    return 'value';
                }
            }
        })
}) (window.angular);
