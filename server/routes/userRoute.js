// jshint esversion:6

const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = db.User;
const LocalStrategy = require('passport-local').Strategy;

  router.get('/', function(req, res){
    res.send('In the User Route');
  });

  router.get('/login', function(req, res){
    res.send('Login Test');
  });


  passport.use(new LocalStrategy(
    function (email, password, done) {
      User.findOne({
        where: {
          email: email
        }
      }).then ( email => {
        if (email === null) {
          console.log('email failed');
          return done(null, false, {message: 'bad email'});

      }else {

        bcrypt.compare(password, email.password).then(res => {
          console.log('This is now the pw and email.pw',password, email.password);
          if (res) {
            return done(null, email);
          }else {
            return done(null, false);
          }
        });

      }
    }).catch(err => {
      console.log('error: ', err);
    });
  })
);

passport.serializeUser(function(user, done) {
  return done(null, {
    id:user.id,
    email:user.email
  });
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  router.get('/signup', function(req, res){
    res.render('', { message: req.flash('signupMessage') });//signup button render
  });

  router.post('/signup', function(req, res){
    console.log('Body ',req.body);
    if(req.body.first_name !== '' && req.body.last_name !== '' && req.body.email !== '' && req.body.password !== '' && req.body.confirm_password !== '' && req.body.security_question !== '' && req.body.security_answer !== ''){
      if(req.body.password === req.body.confirm_password){

        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            User.create({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: hash,
              confirm_password: hash,
              security_question: req.body.security_question,
              security_answer: req.body.security_answer
            })
            .then((users) =>{
              console.log('Server User: ', users);
                res.send(users);
            })
            .catch(err => {
              console.log('Something went wrong: ', err);
            });
          });
        });
      }else{
        console.log('Passwords don\'t match');
      }
    }else{
      console.log('Must complete form to sign up!');
    }

  // router.post('/login', passport.authenticate('local-signup', {
  //   successRedirect: '/',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // })

  // );

  router.get('/profile', isLoggedIn, function(req, res){
    res.render('', { user: req.user });//profile render
  });

  router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook',
      {successRedirect: '/profile',
      failureRedirect: '/'
      }));

  router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

  router.get('/auth/google/callback',
    passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
    }));

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}

module.exports = router;