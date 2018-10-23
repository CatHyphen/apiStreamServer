const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ChannelSchema = new Schema({
  _id: {
    type:ObjectId
  },
  Id_Account: {
    type:String,
    required:true,
    unique:true
  },
  Display_Name:{
    type:String,
    required:true
  },
  BroadCast_Path:{
    type:String,
    required:true
  },
  Bio:{
    type:String
  },
  Profile_Picture:{
    type:String,
    required:true
  },
  Profile_Banner:{
    type:String,
    required:true
  },
  Mature_Content:{
    type:Boolean,
    required:true
  },
  Notification:{
    type:Boolean,
    required:true
  },
  Followers:{
    type:Number,
    required:true
  },
  Followings:{
    type:Number,
    required:true
  },
  Live_Title:{
    type:String,
    required:true
  },
  Go_Live_Notification:{
    type:String
  },
  Category:{
    type:Array,
    required:true
  },
  Tags:{
    type:Array,
    required:true
  },
  Language:{
    type:ObjectId,
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

ChannelSchema.methods.getById=(id,cb)=>{
  return this.model('Channel').findById(id,cb);
};

module.exports = mongoose.model('Channel',ChannelSchema);
