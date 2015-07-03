var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var path = require("path");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


// POST method
app.post('/submitpizza', function(req, res){
  var pizzaType = req.body.pizzatype;
  var customerAddress = req.body.customeraddress;
  var html = "Your " + pizzaType + " pizza will be arriving at " +
  customerAddress + " soon."
  res.send(html); 
   console.log(req.body.pizzatype);
   console.log(req.body.customername);
});

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
