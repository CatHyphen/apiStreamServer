const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const mongoose = require('mongoose');
const utils = require('../utils');
const responses =require('../responses');
const generator  = require('../generators');
const checkJwt = require('../middlewares/checkJwt');
const protectRoute = require('../middlewares/protectRoute');
const config = require('../config');
const img_config = require('../resources/imur');
//Get all Channels
router.get('/', (req, res)=>{

  let channelProjection = { 
    __v: false,
    Password: false,
    StreamKey:false,
    Email:false,
    Roles:false,
    CreatedAt:false,
    UpdatedAt:false
};
  Channel.find({},channelProjection)
    .then((channel)=>{
        res.status(responses.status.OK).send({channel});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});
//get Channel by Id
router.get('/:id_account', (req, res)=>{
  if(req.params.id_account){
    let channelProjection = { 
      __v: false,
      Password: false,
      StreamKey:false,
      Email:false,
      Roles:false,
      CreatedAt:false,
      UpdatedAt:false
  };
      Channel.find({Id_Account:req.params.id_account},channelProjection)
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
//get Channel by game Id
router.get('/game_id/:id_game', (req,res)=>{
  if(req.params.id_game){

    let channelProjection = { 
      __v: false,
      Password: false,
      StreamKey:false,
      Email:false,
      Roles:false,
      CreatedAt:false,
      UpdatedAt:false
  };
      Channel.find({Current_Streaming_Game:req.params.id_game},channelProjection)
        .then((channel)=>{
            res.status(responses.status.OK).send(channel);
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});  
//get Channel by username
router.get('/username/:username', (req,res)=>{
 

  if(req.params.username){
      Channel.findOne({Username:req.params.username})
        .then((channel)=>{
            res.status(responses.status.OK).send(channel);
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.UserNotFound});
  }
});


/*
*
*Sign up 
*
*/

router.post('/signup',(req,res)=>{
  
    if( utils.checkValidString(req.body) && utils.validateEmail(req.body.email) ){

          let channelProjection ={
            Username:true
          };
          Channel.find({Username:req.body.username},channelProjection,(err,channel)=>{

            
              if(err) {
                throw err;
              }
              else if(channel.length==0)
                {
                  
                    let id = new mongoose.Types.ObjectId();
                    let key = generator.streamKeygen(id);
                    const newChannel = new Channel({
                        _id: id,
                        Email:req.body.email,
                        Username:req.body.username,
                        Password:utils.encrypt(req.body.password),
                        DateOfBirth:new Date(req.body.dateofbirth),
                        BroadCast_Path:config.broadcast,
                        StreamKey:key,
                        Profile_Picture:img_config.avatar,
                        Profile_Banner:img_config.cover,
                        VideoPlayer_Banner:img_config.cover,
                        Bio:'',
                        Mature_Content:false,
                        Notification:false,
                        Views:0,
                        Friends:[],
                        Followers:[],
                        Followings:[],
                        Live_Title:``,
                        Go_Live_Notification:``,
                        Current_Streaming_Game:'',
                        Tags:[],
                        Language:'',
                        CreatedAt:Date.now(),
                        UpdatedAt:Date.now()
                      });
                          
                      newChannel.save().then(c=>{
                        console.log(c)
                        res.send({msg:"asdasdsad"});
                      });
                       
                        
                }
                else{
                  res.status(responses.status.Forbidden).send({err:responses.Error.UsernameAlreadyExisted});
                }

              

          })
        
                

                    
                  
  



  
    }      

});
/*
*
*/

//Update Channel setting Information  in setting,
router.patch('/:id/setting',(req,res)=>{

    console.log(req.params.id);
    console.log(req.body)
  
  if(req.params.id){
    Channel.findOne({_id:req.params.id}).then(channel=>{
        if(utils.checkValidString(req.body)){
          if(req.body.Profile_Banner && req.body.Profile_Picture){
            channel.Display_Name          = req.body.Display_Name;
            channel.Profile_Picture       = req.body.Profile_Picture;
            channel.Profile_Banner        = req.body.Profile_Banner;
            channel.Bio                   = req.body.Bio;
          }
        
          else if(req.body.Profile_Banner && !req.body.Profile_Picture){
            channel.Display_Name          = req.body.Display_Name;
            channel.Profile_Banner        = req.body.Profile_Banner;
            channel.Bio                   = req.body.Bio;
            }
          else if(!req.body.Profile_Banner && req.body.Profile_Picture)
          {
            channel.Display_Name          = req.body.Display_Name;
            channel.Profile_Picture       = req.body.Profile_Picture;
            channel.Bio                   = req.body.Bio;
          }
          else if(!req.body.Profile_Banner && !req.body.Profile_Picture)
          {
          channel.Display_Name          = req.body.Display_Name;
          channel.Bio                   = req.body.Bio;        
          }
          channel.save();
          res.send({success:true});
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
//Update Channel setting Information  in setting,
router.patch('/changeMature/:id',(req,res)=>{

  if(req.params.id){

    Channel.findOne({_id:req.params.id},{Mature_Content:true})
    .then(channel=>{
      channel.Mature_Content = !channel.Mature_Content;
      channel.save();
      res.send({Mature_Content:channel.Mature_Content})
    })
  }
  
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Update Channel setting Information  in setting,
router.patch('/VideoPlayer_Banner/:id',(req,res)=>{

  if(req.params.id){
    if(utils.checkValidString(req.body)){
      Channel.findOne({_id:req.params.id},{VideoPlayer_Banner:req.body.VideoPlayer_Banner})
    .then(channel=>{
      channel.Mature_Content = !channel.Mature_Content;
      channel.save();
      res.send({Mature_Content:channel.Mature_Content})
    })
    }
    else{
      res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
    }
  }
  
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Update Channel setting Information  in setting,
router.patch('/changeNotification/:id',(req,res)=>{


  if(req.params.id){

    Channel.findOne({_id:req.params.id},{Notification:true})
    .then(channel=>{
      channel.Notification = !channel.Notification;
      channel.save();
      res.send({Notification:channel.Notification})
    })
  }
  
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Update Channel dashboard setting  in setting,
router.patch('/:id/dashboard/setting',(req,res)=>{

  let channelProjection = {
    Live_Title:true,
    Go_Live_Notification:true,
    Current_Streaming_Game:true,
    Language:true
  };
  if(req.params.id){
    Channel.findOne({_id:req.params.id},channelProjection).then(channel=>{
        console.log(channel)
        if(utils.checkValidString(req.body)){
          channel.Live_Title                 = req.body.Live_Title;
          channel.Go_Live_Notification       = req.body.Go_Live_Notification;
          channel.Current_Streaming_Game     = req.body.Current_Streaming_Game;
          channel.Language                   = req.body.Language;         
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


//Reset Streaming key
router.patch('/:id_account/key/reset',checkJwt,protectRoute,(req,res)=>{

  
  if(req.params.id_account){
    Channel.find({Id_Account:req.params.id_account}).then(channel=>{
      
          channel.StreamKey          = generator.streamKeygen(req.params.id);
          channel.save(
            (err,updatechannel)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send({newKey:updatechannel.StreamKey});
            });

          })
        .catch(err=>{
          res.send(err)
        })
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Update Current game key
router.patch('/:id_account/game/update',checkJwt,protectRoute,(req,res)=>{

  
  if(req.params.id_account){
    Channel.find({Id_Account:req.params.id_account}).then(channel=>{
      if(utils.checkValidString(req.body))
      {
        channel.Current_Streaming_Game   = req.body.Current_Streaming_Game;
        channel.save((err,updatechannel)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send({newGame:updatechannel.Current_Streaming_Game});
            });

          }
        else{
          res.status(responses.status.Forbidden).send({err:responses.Error.MissingField})
        }
      })   
          
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Delete Channel
router.delete('/:id_account',checkJwt,protectRoute, (req, res)=>{
  if(req.params.id_account){
      Channel.find({Id_Account:req.params.id_account},(err,channel)=>{
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
router.patch('/:id/add_follow/:id_follower',checkJwt,protectRoute,(req,res)=>{

  
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