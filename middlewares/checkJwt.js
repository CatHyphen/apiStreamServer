const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.use((req,res,next)=>{
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {

    console.log(token)
    jwt.verify(token, config.secretKey, function(err, decoded) {      
      if (err) {
        return res.json({err: 'Failed to authenticate token.' });    
      } else {

        console.log(decoded)
        Channel.findOne({Username:decoded.Username}).then(channel=>{
          if(channel) 
          {       
            req.decoded = decoded; 
            next();
          }
          else{
            return res.status(403).send({ 
         
              err: 'No token provided. You are enter restricted area' 
          });
          }
        })
        
      }
    });

  } else {

    return res.status(403).send({ 
         
        err: 'No token provided. You are enter restricted area' 
    });

  }
});
module.exports =router;