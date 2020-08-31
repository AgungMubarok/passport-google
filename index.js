const express = require('express');
const passport = require('passport')
require('dotenv').config()
const db = require('./config/db');
const bodyParser = require('body-parser')
const cors = require('cors')

const userRouter = require('./routes/Users')
const productsRouter = require('./routes/Products')
const productImageRouter = require('./routes/ProductImage')
const cartsRouter = require('./routes/Carts')
const transactionsRouter = require('./routes/Transactions')

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
require('./config/strategies').strategies()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('welcome to homepage')
})

app.use('/', userRouter)
app.use('/', productsRouter)
app.use('/', productImageRouter)
app.use('/', cartsRouter)
app.use('/', transactionsRouter)

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// FACEBOOK AUTHENTICATE
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
   res.json({
       message: 'welcome with facebook'
   })
  });

// END FACEBOOK AUTHENTICATE

//GOOGLE AUTHENTICATE
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json({
      message: 'welcome with google'
    });
  });
//END GOOGLE AUTHENTICATE

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we re connected'));

app.listen(PORT, ()=> {
    console.log(`connected AT PORT ${PORT}`)
})