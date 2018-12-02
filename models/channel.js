const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ChannelSchema = new Schema({
  _id: {
    type:ObjectId
  },
  Email: {
    type:String,
    required:true,
  },
  Username:{
    type:String,
    required:true
  },
  Password:{
    type:String,
    required:true
  },
  Roles:{
    type:String,
    default:"User"
  },
  DateOfBirth:{
    type:Date,
    required:true
  },
  BroadCast_Path:{
    type:String,
    default:''
  },
  StreamKey: {
    type:String,
    required:true,
    unique:true
  },
  Bio:{
    type:String,
    default:''
  },
  Profile_Picture:{
    type:String,
    required:true
  },
  Profile_Banner:{
    type:String,
    required:true
  },
  VideoPlayer_Banner:{
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
  Views:{
    type:Number,
    default:0
  },
  Friends:{
    type:Array,
    default:[]
  },
  Followers:{
    type:Array,
    default:[]
  },
  Followings:{
    type:Array,
    default:[]
  },
  Live_Title:{
    type:String,
    default:''
  },
  Go_Live_Notification:{
    type:String,
    default:''
  },
  Current_Streaming_Game:{
    type:String,
    default:''
  },
  Tags:{
    type:Array,
    default:[]
  },
  Language:{
    type:String,
    default:''
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


module.exports = mongoose.model('Channel',ChannelSchema);
