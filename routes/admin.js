const express = require('express')
const router = express.Router();
const Channel = require('../models/channel');
const responses = require('../responses');
router.get('/login',(req,res)=>{

  res.render('login');
});
router.post('/login',(req,res)=>{
  console.log(req)
});

module.exports = router