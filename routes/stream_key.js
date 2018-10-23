const express = require('express')
const router = express.Router();
const StreamKey = require('../models/stream_key');
const mongoose =require('mongoose');
const responses =require('../responses');
const utils = require('../utils');
const generator  = require('../generators');
//Get all StreamKeys
router.get('/', (req, res)=>{
  StreamKey.find({})
    .then((stream_key)=>{
        res.status(responses.status.OK).send({stream_key});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});

/** 
* Get the streaming key related to the Account
*
*@params {id} is the account id
*
**/
router.get('/:id', (req, res)=>{
  if(req.params.id){
      StreamKey.find({Id_Account:req.params.id})
        .then((key)=>{
            res.status(responses.status.OK).send({key});
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

// Create StreamKey
router.post('/',(req,res)=>{
        console.log(req.body);
      if(utils.checkValidString(req.body) ){
            const keys = new StreamKey({

              _id: new mongoose.Types.ObjectId(),
              Id_Account:req.body.Id_Account,
              StreamKey:generator.streamKeygen(req.body.Id_Account),
            });
            keys.save()
              .then(key=>{
                res.status(responses.status.OK).send({key});
              })
              .catch(err=>{
                res.status(responses.status.NotFound).send({err:err._message});
              });
      }
      else{
        res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
      }
  
});
//Update StreamKey
router.patch('/:id',(req,res)=>{

  
  if(req.params.id){
    StreamKey.findById(req.params.id).then(StreamKey=>{
        if(utils.validateEmail(req.body.Email)){
          StreamKey.Email       = req.body.Email;
          StreamKey.Username    = req.body.Username;
          StreamKey.Password    = encrypt(req.body.Password);
          StreamKey.DateOfBirth = new Date(req.body.DateOfBirth);
          StreamKey.UpdatedAt = Date.now();
          StreamKey.save(
            (err,updateStreamKey)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updateStreamKey);
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
//Delete StreamKey
router.delete('/:id', (req, res)=>{
  if(req.params.id){
      StreamKey.findById(req.params.id,(err,StreamKey)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        StreamKey.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

module.exports = router