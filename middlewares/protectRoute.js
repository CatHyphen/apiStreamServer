const responses = require('../responses');
module.exports = function (req,res,next){

  if(req.decoded.Admin){
   return next();
  }
  return res.status(responses.status.Forbidden).json({err:responses.Error.PermisionDenied});
}