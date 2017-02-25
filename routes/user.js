var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var csrfProtection =  csurf();

router.use(csrfProtection);

/* GET users listing. */

router.get('/profile', isLogedIn, function(req, res, next) {

  res.render('user/profile');

});
router.get('/logout', isLogedIn, function(req, res, next) {
   req.logout();
   res.redirect('/');

});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});
router.get('/signUp', function(req, res, next) {

  var messages = req.flash('error');
  res.render('user/signUp', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});
router.post('/signUp', passport.authenticate('local.signup', {
     successRedirect: '/user/profile',
     failureRedirect: '/user/signUp',
     failureFlash: true 
}));



router.get('/signIn', function(req, res, next) {
  
  var messages = req.flash('error');
  res.render('user/signIn', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});
router.post('/signIn', passport.authenticate('local.signin', {
     successRedirect: '/user/profile',
     failureRedirect: '/user/signIn',
     failureFlash: true 
}));




module.exports = router;

 function notLoggedIn(req, res, next) {

	 if (!req.isAuthenticated()) {
         return next();
	 }
     res.redirect('/');
}


function isLogedIn(req, res, next) {

	 if (req.isAuthenticated()) {
         return next();
	 }
     res.redirect('/');
}
