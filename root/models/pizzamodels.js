var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// Order Schema
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
mongoose.connect('mongodb://localhost:27017/pizzastore?auto_reconnect');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("succesful db connection...");
});

var Order = mongoose.model('ordercollection', orderSchema);

exports.Order = Order;