const express = require('express')
const router = express.Router();
const GameType = require('../models/game_type');
const mongoose =require('mongoose');
const responses =require('../responses');


//Get all GameTypes
router.get('/', (req, res)=>{
  GameType.find({})
    .then((game_type)=>{
        res.status(responses.status.OK).send({game_type});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});


// Create GameType
router.post('/',(req,res)=>{   
            const type = new GameType({

              _id: new mongoose.Types.ObjectId(),
              Name:req.body.Name
            });
            type.save()
              .then(newtype=>{
                res.status(responses.status.OK).send({newtype});
              })
              .catch(err=>{
                res.status(responses.status.NotFound).send({err:err._message});
              });
      
      
      
  
});
//Update GameType
router.patch('/:id',(req,res)=>{

  
  if(req.params.id){
    GameType.findById(req.params.id).then(gametype=>{
        if(req.body.Name){
          gametype.Name       = req.body.Name;
          gametype.UpdatedAt = Date.now();
          gametype.save(
            (err,updateGameType)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updateGameType);
            });
           }
        else{
            res.status(responses.status.Forbidden).send({err:responses.Error.MissingField});
          }
          

          });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//Delete GameType
router.delete('/:id', (req, res)=>{
  if(req.params.id){
      GameType.findById(req.params.id,(err,game)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        game.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

module.exports = router