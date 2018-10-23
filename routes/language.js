const express = require('express')
const router = express.Router();
const Language = require('../models/language');
const mongoose =require('mongoose');
const responses =require('../responses');
const utils = require('../utils');

//Get all Languages
router.get('/', (req, res)=>{
  Language.find({})
    .then((lang)=>{
        res.status(responses.status.OK).send({lang});
    })
    .catch(err=>{
      res.status(responses.status.BadRequest).send({error:err});
    });
});


// Create Language
router.post('/',(req,res)=>{
        console.log(req.body);
      
            const langs = new Language({

              _id: new mongoose.Types.ObjectId(),
              Name:req.body.Name,
              NativeName:req.body.NativeName
            });
            langs.save()
              .then(lang=>{
                res.status(responses.status.OK).send({lang});
              })
              .catch(err=>{
                res.status(responses.status.NotFound).send({err:err._message});
              });
      
      
      
  
});
//Update Language
router.patch('/:id',(req,res)=>{

  
  if(req.params.id){
    Language.findById(req.params.id).then(Language=>{
        if(utils.validateEmail(req.body.Email)){
          Language.Email       = req.body.Email;
          Language.Username    = req.body.Username;
          Language.Password    = encrypt(req.body.Password);
          Language.DateOfBirth = new Date(req.body.DateOfBirth);
          Language.UpdatedAt = Date.now();
          Language.save(
            (err,updateLanguage)=>{
              if(err) res.status(responses.status.BadRequest).send({err:err._message});
              res.status(responses.status.OK).send(updateLanguage);
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
//Delete Language
router.delete('/:id', (req, res)=>{
  if(req.params.id){
      Language.findById(req.params.id,(err,Language)=>{
        if(err) res.status(responses.status.BadRequest).send({error:err});
        Language.remove();
        res.status(responses.status.Ok).send({msg:responses.Message.SuccessfulDeleted});
      });
  }
  else{
    res.status(responses.status.BadRequest).send({err:responses.Error.IdNotFound});
  }
});

module.exports = router