const responses = require('../responses');
module.exports = function (req,res,next){
   console.log(req.decoded)
  if(req.decoded.Username !==''){
   return next();
  }
  return res.status(responses.status.Forbidden).json({err:responses.Error.PermisionDenied});
}