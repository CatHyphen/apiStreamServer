const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const GameSchema = new Schema({
  _id: {
    type:ObjectId
  },
  ShortName: {
    type:String,
    required:true
  },
  FullName:{
    type:String,
    required:true
  },
  Image_Cover:{
    type:String,
    required:true
  },
  Views:{
    type:Number,
    required:true
  },
  Type:{
    type:Array,
    required:true
  },
  CreatedAt:{
    type:Date,
    default:Date.now()
  },
  UpdatedAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Game',GameSchema);