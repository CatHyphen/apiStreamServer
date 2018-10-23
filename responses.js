module.exports = {
  status:{
    //Successful responses
  OK:200,
  Created:201,
  Accepted:202,

  //Client Error
  BadRequest:400,
  Unauthorized:401,
  Forbidden:403,
  NotFound:404,
  MethodNotAllowed:405,
  RequestTimeout:408,


  //Server Error
  InternalServerError:500,
  NotImplemented:501,
  BadGateway:502,
  ServiceUnavailable:503,
  GatewayTimeout:504,
  HTTPVersionNotSupported:505,
  VariantAlsoNegotiates:506,
  },
  Error:{
    EmailIncorrectFormated: "The email(s) information field you provided, seems not to be an correct email!",
    PasswordNotMatch: " The password that you entered is not correct or belongs to another email!",
    MissingField:"The information you provided is missing somethings!",
    IdNotFound:"The id of the account you provided is not a existed one or missing charactors!",
    UserNamePassWordNotFound:"The username or password is not correct! ",
    PermisionDenied:"Permision denied! You are not allow to do this!",
    UsernameAlreadyExisted: "Username Already Existed",
  },
  Message:{
    SuccessfulDeleted:"Delete Successfully"
  }

}