const responses = require('../responses');
module.exports = function (req,res,next){

  if(req.decoded.Username ===req.body.username){
   return next();
  }
  return res.status(responses.status.Forbidden).json({err:responses.Error.PermisionDenied});
}