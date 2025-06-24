const express = require('express')

const app = express()

// Maps static file
app.use('/', express.static(__dirname + '/public'))

app.listen(3000, () => {
  console.log('Server Started at http://localhost:3000')
})