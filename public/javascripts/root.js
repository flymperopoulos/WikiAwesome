var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider.when("/",
    {
      templateUrl: "../main.html",
      controller: "mainController"
    }
  );
});

app.controller("mainController", function($scope){
  $scope.languageName = "yo";
});