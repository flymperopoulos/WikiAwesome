var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider

    // route to home page
      .when("/",
        {
          templateUrl: "../htmlLayouts/home.html",
          controller: "mainController"
        })

    // route to creation of new wiki form
      .when('/newarticle', {
          templateUrl : '../htmlLayouts/newarticle.html',
          controller  : 'newWikiController'
      })
});

app.controller("mainController", function($scope, $http){
    $scope.snip = "yo";

    $scope.wikis = function (){

        $http.get('/wikis')
            .success(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
                $scope.articles=data
              })

            .error(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
              });
        }

    // method with all our stuff from get request
    $scope.wikis();
    
});

app.controller('newWikiController', function($scope, $http, $location) {
    $scope.submitNewArticle= function(){ 
        var ArticleX = {
            title : $scope.articleTitle,
            content: $scope.articleContent
        };

    $http.post("/createWiki", ArticleX)
        .success(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
            $location.path('/');
          })
        .error(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
          });
    } 
});

