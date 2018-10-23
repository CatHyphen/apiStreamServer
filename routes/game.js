const express = require('express')
const router = express.Router();
const Game = require('../models/game');
const mongoose =require('mongoose');
const utils = require('../utils');
const responses =require('../responses');
const protectRoute = require('../middlewares/protectRoute');


//Get all Games
router.get('/', (req, res)=>{
  Game.find({})
    .then((Game)=>{
        res.status(responses.status.OK).send({Game});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});
//get Game by Id
router.get('/:id', (req, res)=>{
  if(req.params.id){
      Game.findById(req.params.id)
        .then((game)=>{
            res.status(responses.status.OK).send({game});
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

// Create Game
router.post('/',protectRoute,(req,res)=>{
 
      if(utils.checkValidString(req.body) ){
            const Ngame = new Game({

              _id: new mongoose.Types.ObjectId(),
              ShortName:req.body.ShortName,
              FullName:req.body.FullName,
              Image_Cover:req.body.Image_Cover,
              Views:0,
              Type:req.body.Type

            });
            Ngame.save()
              .then(game=>{
                res.status(responses.status.OK).send({game});
              })
              .catch(err=>{
                res.status(responses.status.NotFound).send({err:err._message});
              });
      }
      else{
        res.status(responses.status.BadRequest).send({err:responses.Error.MissingField});
      }
  
});
/* Increase views
* @params(id)
*/
router.post('/inc/:id',(req,res)=>{
  if(req.params.id)
  {
    console.log(req.params.id)
      Game.findById(req.params.id, (err,game)=>{
        if(err){
          res.status(responses.status.BadRequest).send({err:err._message});
        } 
        else{
          game.Views = game.Views + 1;
          game.save().then(resolve=>{
            if(resolve) res.status(responses.status.OK).send({msg:'Increased'})
          })
        }     
        
       
      });
      
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
};
});
//Update Game
router.patch('/:id',protectRoute,(req,res)=>{

  
  if(req.params.id){
    Game.findById(req.params.id).then(game=>{
        if(utils.validateEmail(req.body.Email)){
          game.ShortName       = req.body.ShortName;
          game.FullName    = req.body.FullName;
          game.Iamge_Cover    = req.body.Iamge_Cover;
          game.Type = game.Type.push(req.body.Type);
          game.UpdatedAt = Date.now();
          game.save(
            (err,updateGame)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updateGame);
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
//Delete Game
router.delete('/:id',protectRoute, (req, res)=>{
  if(req.params.id){
      Game.findById(req.params.id,(err,Game)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        Game.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});


module.exports = router