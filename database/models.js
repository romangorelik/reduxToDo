let Todos = require('./index.js')

module.exports = {
  save: (object) => {
    new Todos ({
      task: object.task
    }).save()
  },
  delete: (task) => {
    Todos.deleteOne({task: task}, function (err) {
      if (err) console.error(err)
    })
  },
  retrieve: () => {
    return Todos.find({}).exec()
  },
  update: (object) => {
    Todos.updateOne({task: object.task}, {task: object.newTask}, function (err) {
      if (err) console.error(err)
    })
  }
}
