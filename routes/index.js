var mongoose = require('mongoose');
var path = require('path');
var WikiArticle = require(path.join(__dirname,'../models/articleFile'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

routes.createWiki = function (req, res){

	articleTitle = req.body.title;
	articleContent = req.body.content;

	var newArticle = new WikiArticle({
		title : articleTitle,
		content : articleContent
	});

	newArticle.save(function (err, article){
		if (err) {
			errorHandler(err, req, res);
		} else {
			// sends article as json
			res.json(article);
		}
	})
}

module.exports = routes;