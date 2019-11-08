var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
    userId: { type: ObjectId, required: true },
    todo: { type: String, required: true },
    detail: { type: Boolean },
    dateCreated: { type: String, default: Date.now },
    dueDate: { type: String, default: Date.now },
    status: { type: Date, default: 'Todo' },
    file: {fileName: String, originalName: String}
});

module.exports = Mongoose.model('Todo', TodoSchema);