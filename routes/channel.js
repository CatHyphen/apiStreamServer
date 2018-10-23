const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const mongoose =require('mongoose');
const utils = require('../utils');
const responses =require('../responses');
const img_config = require('../resources/imur');


//Get all Channels
router.get('/', (req, res)=>{
  
  Channel.find({})
    .then((channel)=>{
        res.status(responses.status.OK).send({channel});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});
//get Channel by Id
router.get('/:id', (req, res)=>{
  if(req.params.id){
      Channel.findById(req.params.id)
        .then((channel)=>{
            res.status(responses.status.OK).send({channel});
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

// Create Blank Channel ( this is automatically call when a new account is created!)  
router.post('/:id',(req,res)=>{
    if(utils.checkValidString(req.body)){

      const channel = new Channel({

        _id: new mongoose.Types.ObjectId(),
        Id_Account:req.params.id,
        Display_Name:req.body.Display_Name,
        BroadCast_Path:req.body.BroadCast_Path,
        Profile_Picture:img_config.avatar,
        Profile_Banner:img_config.cover,
        Bio:'',
        Mature_Content:req.body.Mature_Content,
        Notification:req.body.Notification,
        Followers:[],
        Followings:[],
        Live_Title:`${req.body.Display_Name} Stream!`,
        Go_Live_Notification:`${req.body.Display_Name} is streaming now!`,
        Category:[],
        Tags:[],
        Language:'',
        CreatedAt:Date.now(),
        UpdatedAt:Date.now(),

      });
      channel.save()
        .then(Channel=>{
          res.status(responses.status.OK).send({Channel});
        })
        .catch(err=>{
          res.status(responses.status.NotFound).send({err:err._message});
        });
      }
      else{
        res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
      }
  
  
  
});
//Update Channel Information ()
router.patch('/:id',(req,res)=>{

  
  if(req.params.id){
    Channel.findById(req.params.id).then(channel=>{
        if(utils.validateEmail(req.body.Email)){
          channel.Email       = req.body.Email;
          channel.Username    = req.body.Username;
          channel.Password    = utils.encrypt(req.body.Password);
          channel.DateOfBirth = new Date(req.body.DateOfBirth);
          channel.UpdatedAt = Date.now();
          channel.save(
            (err,updatechannel)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updatechannel);
            });
           }
        else{
            res.status(responses.status.Forbidden).send({err:responses.Error.EmailIncorrectFormated});
          }
          

          });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Delete Channel
router.delete('/:id', (req, res)=>{
  if(req.params.id){
      Channel.findById(req.params.id,(err,channel)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        channel.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Add Follower
router.patch('/:id/add_follow/:id_follower',(req,res)=>{

  
  if(req.params.id && req.params.id_follower){
    Channel.findById(req.params.id).then(channel=>{
        if(utils.validateEmail(req.body.Email)){
          channel.Email       = req.body.Email;
          channel.Username    = req.body.Username;
          channel.Password    = utils.encrypt(req.body.Password);
          channel.DateOfBirth = new Date(req.body.DateOfBirth);
          channel.UpdatedAt = Date.now();
          channel.save(
            (err,updatechannel)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updatechannel);
            });
           }
        else{
            res.status(responses.status.Forbidden).send({err:responses.Error.EmailIncorrectFormated});
          }
          

          });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
module.exports = router