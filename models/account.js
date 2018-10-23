const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const AccountSchema = new Schema({
  _id: {
    type:ObjectId
  },
  Email: {
    type:String,
    required:true,
    unique:true
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
  CreatedAt:{
    type:Date,
    default:Date.now()
  },
  UpdatedAt:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Account',AccountSchema);