var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodosSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, required: true },
    fullName: { type: String, required: true },
    todo: { type: String, required: true },
    detail: { type: String },
    dateCreated: { type: Date, default: Date.now },
    dateDue: { type: Date, default: Date.now },
    status: { type: String, Enum: ['Yes', 'No'], default: 'No' },
    dishType: { type: String, Enum: ['Side Dish', 'Main Course', 'Desert', 'Beverage'] },

    file: {
        name: { type: String },
        originalname: { type: String }
    }
});

module.exports = Mongoose.model('todos', TodosSchema);