const express = require('express')
const router = express.Router()
const Account = require('../../models/account');
const jwt =  require('jsonwebtoken');
const config = require('../../config');
const utils = require('../../utils');
const responses = require('../../responses');
router.post('/login', (req, res) => {
  console.log(req.body.user)
  Account.findOne({
    Username: req.body.user.username
  }, (err, acc) => {

    if (err) res.status(responses.status.BadRequest).send({err:responses.Error.UserNamePassWordNotFound}) ;

    if (!acc) {
      res.status(responses.status.NotFound).json({
        message: responses.Error.UserNamePassWordNotFound
      });
    } else if (acc) {

     
      if (acc.Password != utils.encrypt(req.body.user.password)) {
        res.status(responses.status.NotFound).json({
          success: false,
          message: responses.Error.UserNamePassWordNotFound
        });
      } else {

          
          
          var token = jwt.sign(createPayload(acc), config.secretKey, {
            expiresIn: 60*60*24 
            });
            res.status(responses.status.OK).json({
                success: true,
                message: 'Woa la, BPhone is about to release!',
                token: token
            });
        

        
        
      }

    }

  });

});

function createPayload(account){
  if(account.Roles =="Admin")
          {
            console.log(account.Roles);
            return payload = {
              "UserId":account._id,
              "Admin":true,
              "Username":account.Username,
              "Password":account.Password
          };
            
          }
         return payload = {
              "UserId":account._id,
              "Admin":false,
              "Username":account.Username,
              "Password":account.Password
          };
}
module.exports = router