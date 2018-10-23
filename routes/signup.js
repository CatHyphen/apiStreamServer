const express = require('express')
const router = express.Router();
const Account = require('../models/account');
const mongoose =require('mongoose');
const utils = require('../utils');
const responses =require('../responses');

router.post('/',(req,res)=>{
  if( utils.checkValidString(req.body) && utils.validateEmail(req.body.Email)){

      Account.findOne({Username:req.body.Username}).then(acc=>{
        if(!acc){

          const acc = new Account({

            _id: new mongoose.Types.ObjectId(),
            Email:req.body.Email,
            Username:req.body.Username,
            Password:utils.encrypt(req.body.Password),
            DateOfBirth:new Date(req.body.DateOfBirth)
  
          });
          acc.save()
            .then(account=>{
              res.status(responses.status.OK).send({account});
            })
            .catch(err=>{
              res.status(responses.status.NotFound).send({err:err._message});
            });
        }
        else{
          res.status(responses.status.Forbidden).send({err:responses.Error.UsernameAlreadyExisted});
        }
      })
        
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.EmailIncorrectFormated})
  }
});
module.exports = router;