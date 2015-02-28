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

app.controller("mainController", function($scope){
    $scope.snip = "yo"
    // $scope.search = function(){
    //     console.log('Searching...')
    //         var found = false;
    //         })
    //     };
});

app.controller('newWikiController', function($scope, $http) {
    $scope.submitNewArticle= function(){ 
        var ArticleX = {
            title : $scope.articleTitle,
            content: $scope.articleContent
        };

    $http.post("/createWiki", ArticleX)
        .success(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);

          })
        .error(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
          });
    } 
});

