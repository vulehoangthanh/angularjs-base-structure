(function(angular) {
    'use strict';
    var app = angular.module('ExampleModule',[]);
    //Router Here
    app.config(function($stateProvider) {
        $stateProvider.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/theme/dashboard.html",
            controller: function () {}
        });
    });
    //Component Here

    //Filter Here

    //ServiceHere
}) (window.angular);
