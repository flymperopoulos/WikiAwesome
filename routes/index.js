var mongoose = require('mongoose');
var path = require('path');
var WikiArticle = require(path.join(__dirname,'../models/articleFile'));

var routes = {};

routes.home = function(req, res){
	res.sendfile('./public/main.html')
};

routes.createWiki = function (req, res){
	console.log(req.body);
}

module.exports = routes;