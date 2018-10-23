//Declare dependences
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
const dbconfig = require('./db_provider/db_config');
const config = require('./config');

// Import routes
const accountRoute = require('./routes/account');
const channelRoute = require('./routes/channel');
const gameRoute = require('./routes/game');
const streamKeyRoute = require('./routes/stream_key');
const languageRoute = require('./routes/language');
const authenticateRoute = require('./routes/authentication/authenticate');
const checkJwt = require('./middlewares/checkJwt');
const game_types = require('./routes/game_type');
const signupRoute = require('./routes/signup');
//Setting up 
const app = express();

app.set('topSecret',config.secretKey || process.env.SECRETKEY);

app.set('port',process.env.PORT || 3000);

app.use(cors());



//
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


//Configure the cors 
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Heades","Origin,X-Requested-With,Content-Type,Accept,Authorization");
  if(req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
    return res.status(200).json({});

  }
  next();
});


app.use('/signup',signupRoute);
app.use('/authenticate',authenticateRoute);
app.use('/api',checkJwt);
app.use('/api/accounts',accountRoute);
app.use('/api/channels',channelRoute);
app.use('/api/game_types',game_types);
app.use('/api/games',gameRoute);
app.use('/api/stream_keys',streamKeyRoute);
app.use('/api/languages',languageRoute);

mongoose.connect(dbconfig.uri,{ useNewUrlParser: true },()=>{
  console.log('Connect to the mongodb cloud!');
  app.listen(app.get('port'),()=>console.log(`Server is running on port : ${app.get('port')}`));
});
