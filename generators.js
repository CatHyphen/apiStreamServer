const utils = require('./utils');
module.exports = {

  
  streamKeygen : (id)=>{
    return utils.encrypt(id);
  }

}