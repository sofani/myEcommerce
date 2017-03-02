var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');
var flash = require('connect-flash');


var Order = require('../models/order');
var Cart = require('../models/cart');

var csrfProtection =  csurf();
router.use(csrfProtection);

/* GET users listing. */

router.get('/profile', isLogedIn, function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders: orders });
    });
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
     failureRedirect: '/user/signUp',
     failureFlash: true 
}), function (req, res, next) {
  
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

router.get('/signIn', function(req, res, next) {
  
  var messages = req.flash('error');
  res.render('user/signIn', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});
router.post('/signIn', passport.authenticate('local.signin', {
     
     failureRedirect: '/user/signIn',
     failureFlash: true 
}), function (req, res, next) {

    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
  });

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
