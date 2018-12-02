const express = require('express')
const router = express.Router()
const Channel = require('../../models/channel');
const jwt =  require('jsonwebtoken');
const config = require('../../config');
const utils = require('../../utils');
const responses = require('../../responses');
router.post('/login', (req, res) => {


  Channel.findOne({Username: req.body.username} ,(err, channel) => {

    if (err) res.status(responses.status.BadRequest).send({err:responses.Error.UserNamePassWordNotFound}) ;

    if (!channel) {
      res.status(responses.status.NotFound).json({
        message: responses.Error.WrongPassword
      });
    } else if (channel) {

     
      if (channel.Password != utils.encrypt(req.body.password)) {
        res.status(responses.status.NotFound).json({
          success: false,
          message: responses.Error.UserNamePassWordNotFound
        });
      } else {

          
          
          var token = jwt.sign(createPayload(channel), config.secretKey, {
            expiresIn: 60*60*24 
            });
            res.status(responses.status.OK).json({
                success: true,
                message: 'Woa la, BPhone is about to release!',
                token: token,
                username:channel.Username
            });
        

        
        
      }

    }

  });

});

function createPayload(channel){
  if(channel.Roles =="Admin")
          {
            console.log(channel.Roles);
            return payload = {
              "UserId":account._id,
              "Admin":true,
              "Username":channel.Username
          };
            
          }
         return payload = {
              "UserId":channel._id,
              "Admin":false,
              "Username":channel.Username
          };
}
module.exports = router