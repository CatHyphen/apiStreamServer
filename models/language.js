const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const LanguageSchema = new Schema({
  _id: {
    type:ObjectId
  },
  Name: {
    type:String,
    required:true,
    unique:true
  },
  NativeName:{
    type:String,
  }
  
});

module.exports = mongoose.model('Language',LanguageSchema);