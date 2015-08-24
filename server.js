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
/*var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;*/
var employee = models.Employee;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(passport.initialize());
app.use(passport.session());*/
app.use(express.static(__dirname + '/'));

/* passpost setup */
/*passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username + " " + password)
        employee.findOne({ name: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));*/

app.listen(process.env.PORT || 3000);
console.log("Started Pizza Server on port 3000");

/**
   Order Submission method
*/
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
      console.log("Error: " + err);
  }      
  else
      console.log("inserted " + order);
  });
  
  res.writeHead(302, {
    'Location': 'ordersuccess.html'
  });
  res.end();
});


/**
  Price calculation
*/
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

/**
  Employee Authentication
*/
app.post('/authuser', function(req, res){

  var user = req.body.username;
  var pass = req.body.password;
    console.log(user + " " + pass);
  
  employee.findOne({'name': user}, function(err,obj) {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(obj);
      if (obj.password == pass) {
          console.log("login successful");
          res.writeHead(302, {
            'Location': 'admin.html'
          });
          res.end();
      }
    }
  });
/*    passport.authenticate('local', { successRedirect: '/admin.html',
        failureRedirect: '/adminlogin.html',
        failureFlash: true })*/

});

/**
 * Fetching orders
 * */
app.get( '/filter', function (req, res) {
    mongoose.model('orders').find(function (err, orders) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log(orders[0]);
            res.send(orders);
        }
    });
});


