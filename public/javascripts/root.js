var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

    // route to home page
      .when("/",
        {
          controller: "mainController"
        })

    // route to creation of new wiki form
      .when('/newarticle', {
          templateUrl : '../htmlLayouts/newarticle.html',
          controller  : 'newWikiController'
      })

    // route to creation of wiki detail form
        .when('/:name', {
            templateUrl : '../htmlLayouts/wikiArticleDetail.html',
            controller  : 'articleWikiDetailController'
        });

        $locationProvider.html5Mode(true);
});

app.controller("mainController", function($scope, $http, $location, $routeParams){
    
    $scope.search = function (){
        $scope.match = false;
        
        $scope.articles.forEach(function (article){
            if (article.title === $scope.articleName && $scope.articleName.length>0){
                $scope.match = true;
                $location.path('/'+$scope.articleName);
            }
        })

        if (!$scope.match){
            $location.path('/newarticle');
            $scope.createdFromSearch = true;
            $scope.articleTitle = $scope.articleName;
        }
    }

    $scope.randomArticleSubmit = function (){
        $scope.randomArticleSelected = $scope.articles[Math.floor(Math.random()*$scope.articles.length)];
        $location.path('/' + $scope.randomArticleSelected.title);
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
            content: $scope.articleContent,
            image : $scope.articleImage
        };

        console.log($scope.articleImage);

    $http.post("/createWiki", ArticleX)
        .success(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
            console.log("cock ", $scope.articles);
            $scope.articles.push(data);
            $location.path('/');
          })

        .error(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
          });
    }

});

app.controller('articleWikiDetailController', function($scope, $http, $location, $routeParams){
    $scope.showProperty = true;

    $scope.editDetailArticle = function(){
        $scope.showProperty = false;
        console.log("inside edit button");

        $scope.articleTitleNew = $scope.articleSearchedTitle;
        $scope.articleContentNew = $scope.articleSearchedContent;
    }

    $scope.editingArticle = function(){
        var newArticleX = {
            title : $scope.articleSearchedTitle,
            newTitle : $scope.articleTitleNew,
            content : $scope.articleContentNew
        }

        $http.post("/editWiki", newArticleX)
            .success(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
                $scope.articles.forEach(function(article){
                    if (article.title === $scope.articleSearchedTitle){
                        article.title = $scope.articleTitleNew;
                    }
                })
                $scope.showProperty = true;
                $scope.articleSearchedTitle = $scope.articleTitleNew;
                $scope.articleSearchedContent = $scope.articleContentNew;

              })
            .error(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
              });
    }

    $scope.articleSearched = function (){

        $http.post('/articleWikiDetail', {title:$routeParams.name})
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
