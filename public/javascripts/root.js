var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider

    // routes to home page
      .when("/",
        {
          templateUrl: "../main.html",
          controller: "mainController"
        }
      );
});

app.controller("mainController", function($scope){
});