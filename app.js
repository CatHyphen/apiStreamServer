//Declare dependences
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
const dbconfig = require('./db_provider/db_config');
const config = require('./config');
const session = require('express-session');
const passport = require('passport');
// Import routes
const channelRoute = require('./routes/channel');
const gameRoute = require('./routes/game');
const languageRoute = require('./routes/language');
const authenticateRoute = require('./routes/authentication/authenticate');
const game_types = require('./routes/game_type');
const admin = require('./routes/admin');

//Setting up 
const app = express();

app.set('topSecret',config.secretKey || process.env.SECRETKEY);

app.set('port',process.env.PORT || 3000);

app.use(cors());

app.set('view engine', 'ejs');

//
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.set('trust proxy', 1) // trust first proxy
         app.use(session({
         secret: config.secretKey,
         resave: false,
         saveUninitialized: true,
         cookie: { secure: true }
}));
app.use(passport.initialize());
//Configure the cors 
// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Heades","Origin,X-Requested-With,Content-Type,Accept,Authorization");
//   if(req.method == 'OPTIONS'){
//     res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
//     return res.status(200).json({});

//   }
//   next();
// });

//Guest can access this route

app.use('/api/authenticate',authenticateRoute);
app.use('/api/channels',channelRoute);
app.use('/api/games',gameRoute);
app.use('/api/game_types',game_types);
app.use('/api/languages',languageRoute);
// admin
app.use('/admin',admin);
mongoose.connect(dbconfig.uri,{ useNewUrlParser: true,useCreateIndex: true, },()=>{
  console.log('Connect to the mongodb cloud!');
  
});
const server = app.listen(app.get('port'),()=>console.log(`Server is running on port : ${app.get('port')}`));


//Chat server
const _ = require('lodash');
const io = require('socket.io')(server);

io.on('connection', function(socket) {
    

    socket.on('ROOM',data=>{
      socket.join(data.room);
    });
    socket.on('LEAVEROOM',(data)=>{
      socket.leave(data.room,()=>{
        try {
          let member =io.nsps['/'].adapter.rooms[data.room].length;
          io.to(data.room).emit('VIEWS', member);
        } catch (error) {
          
        }
        
      })
    });
    socket.on('disconnect',()=>{
      socket.leaveAll();
    });

    socket.on('SEND_MESSAGE', (data)=> {
      
        io.to(data.room).emit('MESSAGE', data);
        
      
        
    });
    socket.on('GET_VIEWS', (data)=> {
      try {
        let member =io.nsps['/'].adapter.rooms[data.room].length;
        io.to(data.room).emit('VIEWS', member);
      } catch (error) {
        
      }
     
  });
});
