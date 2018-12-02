const express = require('express')
const router = express.Router();
const Game = require('../models/game');
const mongoose =require('mongoose');
const utils = require('../utils');
const responses =require('../responses');
const protectRoute = require('../middlewares/protectRoute');
const checkJwt = require('../middlewares/checkJwt');

//Get all Games
router.get('/', (req, res)=>{
  Game.find({}).sort({Views: -1})
    .then((game)=>{
        res.status(responses.status.OK).send(game);
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});
//Get  Games with name like
router.get('/islike/:name', (req, res)=>{
  if(req.params.name){
    Game.find({FullName:{ $regex: '.*' + req.params.name + '.*' }})
    .then((game)=>{
        res.status(responses.status.OK).send(game);
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
 
  }
});
//Get  Games with name like
router.get('/:name', (req, res)=>{
  
  if(req.params.name){
    Game.findOne({FullName: req.params.name })
    .then((game)=>{
        res.status(responses.status.OK).send(game);
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
 
  }
});
//get Game by Id
router.get('/game_id/:id', (req, res)=>{

  if(req.params.id){
      Game.findOne({_id:req.params.id})
        .then((game)=>{
            res.status(responses.status.OK).send(game);
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});
//get Game by Type
router.get('/type/:id', (req, res)=>{
  if(req.params.id){
      Game.find({Type:{$elemMatch: {_id:req.params.id}}})
        .then((game)=>{
            res.status(responses.status.OK).send(game);
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
router.post('/',checkJwt,protectRoute,(req,res)=>{
 
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

//Update Game
router.patch('/:id',checkJwt,protectRoute,(req,res)=>{

  
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
router.delete('/:id',checkJwt,protectRoute, (req, res)=>{
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
/* Increase views
* @params(id)
*/
router.post('/increase/:id',(req,res)=>{
  if(req.params.id)
  {
      
      Game.findOne({_id:req.params.id},(err,game)=>{
        
          let view = game.Views;
          
       
      
          game.Views = view + 1;
          game.save((err,g)=>{
            if(err) res.status(responses.status.BadRequest).send({err});
            if(g){
              res.status(responses.status.OK).send({msg:"Increase"});
            }
          })
          
        
       
      });
      
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
};
});

module.exports = router