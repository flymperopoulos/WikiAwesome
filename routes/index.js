var mongoose = require('mongoose');
var path = require('path');
var WikiArticle = require(path.join(__dirname,'../models/articleFile'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

routes.createWiki = function (req, res){

	// grabs data from request json body
	articleTitle = req.body.title;
	articleContent = req.body.content;
	// articleImage = req.body.image;

	// creates new wikiArticle
	var newArticle = new WikiArticle({
		title : articleTitle,
		content : articleContent,
		// image : articleImage
	});

	// saves wikiArticle and sends responce json
	newArticle.save(function (err, article){
		if (err) {
			errorHandler(err, req, res);
		} else {

			// sends article as json
			res.json(article);
		}
	})
}

routes.wikis = function (req, res){

	WikiArticle.find(function (err, wikis){
		if (err) {
			errorHandler(err, req, res);
		} else {
			res.json(wikis);
		}
	});
}

routes.wikiDetail = function (req, res){
	// it's only going to be the title sent through root.js
	console.log(req.body);
	WikiArticle.findOne({title:req.body.title}, function (err, article){
		if (err) {
			errorHandler(err, req, res);
		} else {
			res.json(article);
		}
	})
}

module.exports = routes;