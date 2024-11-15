const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const morgan = require('morgan');
const app =express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(
  session(
    {
      key:"user_id",
      secret:"random",
      resave:"false",
      saveUninitialized:false,
      cookie: { maxAge: oneDay }
    }
  )
)

app.use((req,res,next)=>{
  if(req.session.user && req.cookies.user_id){
    res.redirect('/dashboard')
  }
  next()
})

const sessionChecker = (req,res,next)=>{
  if(req.session.user && req.cookies.user_id){
    res.redirect('/dashboard')
  }else{
    next()
  }
}

app.get('/',sessionChecker,(req,res)=>{
  res.redirect('/login')
})

app.route('/login',)
