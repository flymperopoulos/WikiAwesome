var mongoose = require("mongoose");

var articleSchema = mongoose.Schema({
  title: String,
  content: String,
  image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("Article", articleSchema);