const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const StreamKeySchema = new Schema({
  _id: {
    type:ObjectId
  },
  Id_Account:{
    type:ObjectId
  },
  StreamKey: {
    type:String,
    required:true,
    unique:true
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
module.exports = mongoose.model('StreamKey',StreamKeySchema);