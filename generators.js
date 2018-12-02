const utils = require('./utils');
module.exports = {

  
  streamKeygen : (id)=>{
    let now = Date.now();
    return utils.encrypt(id+now);
  }

}