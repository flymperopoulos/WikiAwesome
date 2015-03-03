var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var WikiArticle = require(path.join(__dirname,'../models/articleFile'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

routes.createWiki = function (req, res){

	// grabs data from request json body
	var articleTitle = req.body.title;
	var articleContent = req.body.content;
	articleImage = req.body.image;

	// creates new wikiArticle
	var newArticle = new WikiArticle({
		title : articleTitle,
		content : articleContent,
		image : articleImage
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

routes.editWiki = function (req,res){
	console.log('blablablabbal ',req.body);

	WikiArticle.update({title:req.body.title}, {title:req.body.newTitle,content: req.body.content}, function (err, newArticle){
		if (err){
			console.log(err);
		}
		res.json(newArticle);
	});
}

routes.imageUpload = function (req,res){
	console.log(req.files);
	console.log(req.body);
	var data = fs.readFileSync(req.files.file.path);
	WikiArticle.update({title:req.body.title},{image:{data:data,contentType:req.files.file.mimetype}},function(err,data){
		if(err){res.status(500).send('Failed');}
		else{
			fs.unlinkSync(req.files.file.path);
			res.send('ok');
		}
	});

	
}


module.exports = routes;