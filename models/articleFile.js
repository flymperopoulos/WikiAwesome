var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model("Article", articleSchema);