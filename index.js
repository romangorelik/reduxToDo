const express = require ('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const model = require('./database/models.js')

let app = express()
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static(__dirname + '/client/dist/'))

app.post('/todos', (req, res) => {
  console.log('post Here!!!!!', req.body)
  model.save(req.body)
  res.send(req.body)
})

app.get('/todos', (req, res) => {
  model.retrieve().then((response) => {
    res.send(response)
  })
})

app.delete('/todos', (req, res) => {
  console.log(req.body.task)
  model.delete(req.body.task)
  res.send(req.body.task)
})

app.put('/todos', (req, res) => {
  console.log(req.body)
  model.update(req.body)
  res.send(req.body)
})

app.listen(7000, () => console.log('Listening to Port 7000!'))