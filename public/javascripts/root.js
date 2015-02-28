var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){

  $routeProvider

    // route to home page
      .when("/",
        {
          templateUrl: "../htmlLayouts/articleList.html",
          controller: "mainController"
        })

    // route to creation of new wiki form
      .when('/newarticle', {
          templateUrl : '../htmlLayouts/newArticle.html',
          controller  : 'newWikiController'
      })

      // route to creation of new wiki form
        .when('/getArticleWikiDetail', {
            templateUrl : '../htmlLayouts/wikiArticleDetail.html',
            controller  : 'articleWikiDetailController'
        })
});

app.controller("mainController", function($scope, $http, $location){
    
    $scope.search = function (){
        $scope.match = false;
        
        $scope.articles.forEach(function (article){
            if (article.title === $scope.articleName){
                $scope.match = true;
                $location.path('/getArticleWikiDetail');
            }
        })

        if (!$scope.match){
            $location.path('/');
        }
    }

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
            // image : $scope.articleImage
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

app.controller('articleWikiDetailController', function($scope, $http){
    $scope.articleSearched = function (){

        $http.post('/articleWikiDetail', {title:$scope.articleName})
            .success(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);

                $scope.articleSearchedTitle=data.title;
                $scope.articleSearchedContent = data.content;
                // $scope.articleSearchedImage = data.image;
              })

            .error(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
              });
        }

    $scope.articleSearched();
});
