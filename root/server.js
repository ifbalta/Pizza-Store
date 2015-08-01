var express = require("express");
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var router = express.Router();
var path = require("path");
var MongoClient = mongo.MongoClient,
    format = require('util').format;

mongoose.connect('mongodb://localhost:27017/pizzastore?auto_reconnect');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("succesful db connection...");
});


var orderSchema = new mongoose.Schema({
    pizzaType : String,
    pizzaSize : String,
    toppings : [String],
    customerName : String,
    customerAddress : String,
    customerPhone : String,
    totalPrice : Number,
    orderDate : Date
});

var Order = mongoose.model('ordercollection', orderSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

// POST method
app.post('/submitpizza', function(req, res){

 var order = new Order({
        pizzaType : req.body.pizzatype,
        pizzaSize : req.body.pizzasize,
        toppings : req.body.toppings,
        customerName : req.body.customername,
        customerAddress : req.body.customeraddress,
        customerPhone : req.body.customerphone,
        orderDate : new Date()
    });
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
