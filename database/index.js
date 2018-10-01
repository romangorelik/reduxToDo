const mongoose = require('mongoose')
mongoose.connect('mongodb://todo:todotodo1@ds033915.mlab.com:33915/todo');

let todosSchema = mongoose.Schema({
  task: {type: String, required: true}
})

let ToDo = mongoose.model('Todo', todosSchema)

module.exports = ToDo;
