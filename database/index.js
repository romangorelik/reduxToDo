const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/redux');

let todosSchema = mongoose.Schema({
  task: String
})

let ToDo = mongoose.model('Todo', todosSchema)

module.exports = ToDo;
