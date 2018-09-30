const express = require ('express')

let app = express()
app.use(express.static(__dirname + '/client/dist/'))

app.listen(7000, () => console.log('Listening to Port 7000!'))