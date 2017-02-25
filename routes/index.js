var express = require('express');
var router = express.Router();
var Product = require('../models/product');

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


module.exports = router;