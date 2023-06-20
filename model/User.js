var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  nom: {
    type :String,
    required : true
  }, 
  mdp: String,
  photo: String,
  role: String

});

module.exports = mongoose.model('User',UserSchema);