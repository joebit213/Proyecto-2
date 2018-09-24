const router      = require('express').Router()
const User        = require('../models/User')
const passport    = require('passport')
const uploadCloud = require('../helpers/cloudinary')


/////////verifica si esta logeado

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.redirect('/login')
}


///////registro

router.get('/signup', (req, res) => {
  configuration = {
    title: 'Sign Up',
    btnValue: 'Crear cuenta',
    url: '/signup',
    password: true,
    id: ''
  }
  res.render('auth/signup', configuration)
})

router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
  .then(user => {
    res.redirect('/login')
  })
  .catch(e => console.log(e))
})


///////incio de sesion
router.get('/login', (req, res) => {
  if (req.user) req.logOut()
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  req.app.locals.loggedUser = req.user;
  res.redirect('/index')
})