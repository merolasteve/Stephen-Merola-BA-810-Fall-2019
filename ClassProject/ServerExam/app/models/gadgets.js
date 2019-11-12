var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var gadgetSchema = new Schema({
    Yoo: { type: String, required: true },
    Hoo: { type: Number, default: '10' },
});

module.exports = Mongoose.model('Gadget', gadgetSchema);