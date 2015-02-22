// Requires path modulo and the models Person and Twotte
var path = require('path');

// ErrorHandler method
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

// Initializes routes new object
var routes = {};

// index route served
routes.home = function (req,res){
	res.render("home", {"articleLinks": [
	  "/awesome1",
	  "/awesome2"
	  ]
	});
}

module.exports = routes;