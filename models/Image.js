// https://medium.freecodecamp.org/introduction-to-mongoose-for-mongodb-d2a7aa593c57
let mongoose = require('mongoose')
let imageSchema = new mongoose.Schema({
  url: String,
  id: String
})
module.exports = mongoose.model('Image', imageSchema);
