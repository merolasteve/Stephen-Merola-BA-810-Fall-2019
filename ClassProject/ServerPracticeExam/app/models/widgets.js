var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var widgetSchema = new Schema({
    Foo: { type: String, required: true },
    Woo: { type: Number, default: 10 },
   });

module.exports = Mongoose.model('Widget', widgetSchema);