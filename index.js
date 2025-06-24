const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Maps static file
app.use('/', express.static(__dirname + '/public'))

io.on('connection', (socket) => {
  console.log('a user connected!', socket.id)

  socket.on('msg_send', (data) => {
    console.log(data)
    // io.emit('msg_rcvd', data)
    socket.emit('msg_rcvd', data)
  })
})

server.listen(3000, () => {
  console.log('Server Started at http://localhost:3000')
})