let mongoose = require('mongoose');
let projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageURL: String,
  projectURL: String
})
module.exports = mongoose.model('Project', projectSchema);
