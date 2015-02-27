var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider

    // route to home page
      .when("#/",
        {
          templateUrl: "../main.html",
          controller: "mainController"
        })

    // route to creation of new wiki form
      .when('/newarticle', {
          templateUrl : '../htmlLayouts/newarticle.html',
          controller  : 'newWikiController'
      })
});

app.controller("mainController", function($scope){
    // do stuff with searching here
});

app.controller('newWikiController', ['$http',function($scope, $http) {
    $scope.message = 'New Wiki Article Created';
    $scope.submitNewArticle= function(){ 
        var ArticleX = {
            title : $scope.articleTitle,
            content: $scope.articleContent
        };

    $http.post("/createWiki", formData)
        .success(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);

          })
        .error(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
          });
    } 
}]);