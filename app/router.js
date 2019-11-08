(function(angular) {
    'use strict';
    var app = angular.module('AppRouterModule',[]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('dashboard');

        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/theme/dashboard.html",
            controller: function () {}
        });
    });

}) (window.angular);
