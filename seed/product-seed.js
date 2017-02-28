var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost: 27017/test');
var products = [
   
   new Product({
        imagePath: '../images/solar.jpg',
        title: 'solar Panel',
        description: 'solar panel for 12 V',
        price: '50'
       
   }),
   
   new Product({
    imagePath: '../images/battery.jpg',
    title: 'Battery',
    description: 'battery ',
    price: '50'
   
   }),
   new Product({
        imagePath: '../images/controller.jpg',
        title: 'Charge Controller',
        description: 'solar controller for 12 V',
        price: '50'
       
   })
   
   
];



 var done = 0;
 for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
         done++;
         if (done === products.length) {
         	exit();
         }
    });
	
}

function exit() {
	mongoose.disconnect();
}









