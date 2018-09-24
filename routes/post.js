const router      = require('express').Router()
const Post      = require('../models/Post')
const User        = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.redirect('/login')
}

router.get('/create_new', isLogged, (req, res) => {
  res.render('post/create_new')
})

router.post('/create_new', uploadCloud.single('photo'), (req, res, next) => {
  Post.create({ ...req.body, photo: req.file.url, author: req.user._id })
  .then(post => {
    User.findByIdAndUpdate(req.user._id,  { $push: { posts: post._id } }, { new: true })
    .then(user => {
      console.log(user)
      req.app.locals.loggedUser = user
      res.redirect('/profile')
    })
  })
})

module.exports = router