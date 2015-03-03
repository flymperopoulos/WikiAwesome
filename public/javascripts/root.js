var app = angular.module('app', ['ngRoute','ngFileUpload']);

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

// controller for the main controller
app.controller("mainController", function($scope, $http, $location, $routeParams){
    
    // search for directive ng-click
    $scope.search = function (){
        $scope.match = false;
        
        // loops through articles and checks if searched one exists
        $scope.articles.forEach(function (article){
            if (article.title === $scope.articleName && $scope.articleName.length>0){
                $scope.match = true;

                // relocate to the route of the article searched
                $location.path('/'+$scope.articleName);
            }
        })

        // if the searched article doesn't exist, make it
        if (!$scope.match){
            $location.path('/newarticle');
            $scope.createdFromSearch = true;
            $scope.articleTitle = $scope.articleName;
        }
    }

    // random article method 
    $scope.randomArticleSubmit = function (){
        // randomly selects from the list of articles
        $scope.randomArticleSelected = $scope.articles[Math.floor(Math.random()*$scope.articles.length)];
        $location.path('/' + $scope.randomArticleSelected.title);
    }

    // gets tikis and sets the articles equal to the data
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

// controller for new wiki creation
app.controller('newWikiController', ['$scope','$upload','$http','$location','$timeout', function($scope, $upload, $http, $location, $timeout) {
    
    // upload image method
    function uploadUsing$upload(file) {
        console.log(file);
        file.upload = $upload.upload({
            url: '/imageupload',
            method: 'POST',
            fields: {title: $scope.articleTitle},
            file: file
        });

        file.upload.then(function(response) {
            $timeout(function() {
                file.result = response.data;
                $location.path('/'+$scope.articleTitle);
            });
        }, function(response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    // submit new article method from directive in html
    $scope.submitNewArticle = function($files){ 
        var ArticleX = {
            title : $scope.articleTitle,
            content: $scope.articleContent
        };

        // posts new wiki
        $http.post("/createWiki", ArticleX)
            .success(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
                $scope.articles.push(data);
                console.log("files",$files);
                if ($files != null) {
                    uploadUsing$upload($files[0]);
                }else{
                    $location.path('/'+$scope.articleTitle);
                }

                
        })

        .error(function(data, status, headers, config) {
            console.log("data", data);
            console.log("status", status);
          });
    }

}]);

// controller for the each detailed description of wiki
app.controller('articleWikiDetailController', ['$scope','$upload','$http','$location','$timeout','$routeParams','$window', function($scope, $upload, $http, $location, $timeout,$routeParams,$window){
    $scope.showProperty = true;

    function uploadUsing$upload(file) {
        console.log(file);
        file.upload = $upload.upload({
            url: '/imageupload',
            method: 'POST',
            fields: {title: $scope.articleTitleNew},
            file: file
        });

        file.upload.then(function(response) {
            $timeout(function() {
                file.result = response.data;
                $scope.showProperty = true;
                $window.location.reload();
            });
        }, function(response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function(evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    $scope.editDetailArticle = function(){
        $scope.showProperty = false;

        $scope.articleTitleNew = $scope.articleSearchedTitle;
        $scope.articleContentNew = $scope.articleSearchedContent;
    }

    $scope.editingArticle = function($files){
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
                $scope.articleSearchedTitle = $scope.articleTitleNew;
                $scope.articleSearchedContent = $scope.articleContentNew;
                if ($files != null) {
                    uploadUsing$upload($files[0]);
                }else{
                    $scope.showProperty = true;
                }
              })
            .error(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
              });
    }

    // method to show the the article detail searched
    $scope.articleSearched = function (){

        $http.post('/articleWikiDetail', {title:$routeParams.name})
            .success(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);

                $scope.articleSearchedTitle=data.title;
                $scope.articleSearchedContent = data.content;
                if(data.image){
                    var u8 = new Uint8Array(data.image.data);
                    var b64encoded = btoa(String.fromCharCode.apply(null, u8));
                    console.log(b64encoded);
                    $scope.articleSearchedImage = 'data:'+data.image.contentType+';base64,'+b64encoded;
                }
            })

            .error(function(data, status, headers, config) {
                console.log("data", data);
                console.log("status", status);
            });
        }

    $scope.articleSearched();
}]);
