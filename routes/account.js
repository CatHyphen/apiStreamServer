const express = require('express')
const router = express.Router();
const Account = require('../models/account');
const utils = require('../utils');
const responses =require('../responses');



//Get all accounts
router.get('/', (req, res)=>{
  Account.find({})
    .then((acc)=>{
        res.status(responses.status.OK).send({acc});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});
//get account by Id
router.get('/:id', (req, res)=>{
  if(req.params.id){
      Account.findById(req.params.id)
        .then((acc)=>{
            res.status(responses.status.OK).send({acc});
        })
        .catch(err=>{
          res.status(responses.status.BadRequest).send({error:err});
        });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

//Update account
router.patch('/:id',(req,res)=>{

  
  if(req.params.id){
    Account.findById(req.params.id).then(acc=>{
        if(utils.validateEmail(req.body.Email) && utils.checkValidString(req.body) ){
          acc.Email       = req.body.Email;
          acc.Username    = req.body.Username;
          acc.Password    = utils.encrypt(req.body.Password);
          acc.DateOfBirth = new Date(req.body.DateOfBirth);
          acc.UpdatedAt = Date.now();
          acc.save(
            (err,updateAcc)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updateAcc);
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
//Delete Account
router.delete('/:id', (req, res)=>{
  if(req.params.id){
      Account.findById(req.params.id,(err,acc)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        acc.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

module.exports = router