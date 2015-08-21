var express = require("express");
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
    if (typeof order.toppings === 'undefined') {
        order.toppings = [];
    }
    order.totalPrice = calculateTotalPrice(order);

    console.log("saving!");
    order.save(function(err){
    if(err) {
        console.log("typeof totalPrice " + typeof parseFloat(req.body.totalPrice));
        console.log("totalPrice " + parseFloat(req.body.totalPrice));
        console.log("totalPrice " + req.body.totalPrice);
        console.log("error: " +err);
    }      
    else
        console.log("inserted " + order);
    });


    //insertOrder(order);

    console.log(req.body.totalPrice);
    var html = "Your pizza will be arriving soon."
    // res.send(html);
    res.writeHead(302, {
      'Location': 'ordersuccess.html'
    });
    res.end();
});

function calculateTotalPrice (order) {

    var result = 0;

    console.log("Pizza size : " + order.pizzaSize + " " + typeof order.pizzaSize);
    console.log("toppings : " + order.toppings + " " + typeof order.toppingss);

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
 * Inserting the record.
 * */
function insertOrder(order){
    MongoClient.connect('mongodb://localhost:27017/pizzastore?auto_reconnect', function (err, db){
        if (err) {
            next (err);
        }
        console.log("Connected to pizzastore");
        db.collection('ordercollection').insertOne(order, function(err, records){
           if (err) {
            next (err);
           };
            console.log("Record added as " + records[0]._id);
        });
    });
}

// Error handling
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(process.env.PORT || 3000);
console.log("started server");
/*
    ***   Example insert ***
     db.ordercollection.insert({
         pizzaType : "pepperoni",
         toppings : ["cheese", "bellpepper", "jalapeno"],
         customerName : "Cheska Baltazar",
         customerAddress : "4 Quentin Avenue",
         customerPhone : "027 9179593",
         orderDate : new Date()
     })
* */