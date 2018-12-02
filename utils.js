const crypto = require('crypto');
const server_config = require('./config');
const _ =require('lodash');
module.exports ={


  encrypt:(password)=>{

    return hash = crypto.createHmac('sha256',server_config.secretKey)
                      .update(password)
                      .digest('hex');
  
  },
  validateEmail:(email)=>{
    
      let re = server_config.EmailRegex;
      if(email) return re.test(String(email).toLowerCase());
      return false;
  
  },
  checkValidString:(Args)=>{
    
    let valid =false;    
    if(!_.isEmpty(Args))
    {
      _.forOwn(Args, function(value, key) {
          // let reg = server_config.StringRegex;
          // if(value) valid= reg.test(String(value).toLocaleLowerCase());
          if(value) valid = true;
        
       });
      
    }
      return valid;
  }
  


}