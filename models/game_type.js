const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const GameTypeSchema = new Schema({
  _id: {
    type:ObjectId
  },
  Name: {
    type:String,
    required:true
  }
  ,
  CreatedAt:{
    type:Date,
    default:Date.now()
  },
  UpdatedAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('GameType',GameTypeSchema);