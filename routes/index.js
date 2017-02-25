var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');
var csrfProtection =  csurf();

var Product = require('../models/product');
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs, next) {
  var productChunks= [];
  var chunkSize = 3;

  for (var i = 0; i < docs.length; i += chunkSize) {
  		productChunks.push(docs.slice(i,  i + chunkSize));
  		
  }
  res.render('shops/index', { title: 'Eritrean Resturant', products: productChunks});
  	
  });
 
});

router.get('/user/signUp', function(req, res, next) {
  
  var messages = req.flash('error');
  res.render('user/signUp', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});
router.post('/user/signUp', passport.authenticate('local.signup', {
     successRedirect: '/user/profile',
     failureRedirect: '/user/signUp',
     failureFlash: true 
}));
router.get('/user/profile', function(req, res, next) {

  res.render('user/profile');

});

module.exports = router;