var express = require("express");
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var models = require('./models/pizzamodels')
var router = express.Router();
var path = require("path");
var MongoClient = mongo.MongoClient,
    format = require('util').format;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

// POST method
app.post('/submitpizza', function(req, res){

 
  var order = new models.Order();
  order.pizzaType = req.body.pizzatype;
  order.pizzaSize = req.body.pizzasize;
  order.toppings = req.body.toppings;
  order.customerName = req.body.customername;
  order.customerAddress = req.body.customeraddress;
  order.customerPhone = req.body.customerphone;
  order.orderDate = new Date();
  order.completed = false;

  console.log(typeof order.toppings);
  
  // handle empty toppings
  if (typeof order.toppings === 'undefined') {
      order.toppings = [];
  }
  order.totalPrice = calculateTotalPrice(order);

  order.save(function(err){
  if(err) {
      console.log("error: " +err);
  }      
  else
      console.log("inserted " + order);
  });
  
  res.writeHead(302, {
    'Location': 'ordersuccess.html'
  });
  res.end();
});



function calculateTotalPrice (order) {
    var result = 0;
    switch (order.pizzaSize) {
        case 'small' :
          result = 5;
          break;
        case 'medium':
          result = 7;
          break;
          case 'large':
          result = 10;
          break;
      }
      if (order.toppings.length > 0) result += 1 * order.toppings.length;
      return result;
  }


app.listen(process.env.PORT || 3000);
console.log("started server");
