import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
 
const port = 3000

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.get('/', (req, res) => {
  res.send('Hello, World')
})

io.on('connection', (socket) => {
  console.log('user Connected:', socket.id)

  // socket.emit('welcome', `Welcome to our Server at 3000 dear ${socket.id} ✅`)
  // socket.broadcast.emit('welcome', `${socket.id} has joined the Server 🤘`)

  // io.emit('welcome', 'io.emit')

  socket.on('message', (data) => {
    console.log(data)
    // io.emit('received-message', data)
    // socket.broadcast.emit('received-message', data)
    io.to(data.room).emit('received-message', data)
  })

  socket.on('join-room', (room) => {
    socket.join(room)
  })
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})