const  _ = require('lodash')
module.exports ={
  check(model,checkField, fieldValue){
    let query ={};
    _.assign(query,{checkField});
    model.findOne({checkField:fieldValue}).then(doc=>{
      if(doc) return false;
      return true;
    })
  }
}