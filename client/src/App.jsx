import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'

const App = () => {

  const socket = useMemo(() => io('http://localhost:3000'), []) 

  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [socketId, setSocketId] = useState('')
  const [messages, setMessages] = useState([])
  const [roomName, setRoomName] = useState('')

  console.log(messages)


  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', {
      message,
      room
    })
    setMessage('')
  }

  const joinRoomHandler = (e) => {
    e.preventDefault()
    socket.emit('join-room', roomName)
    setRoomName('')
  }

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id)
      console.log('Connected!', socket.id)
    })

    socket.on('received-message', (data) => {
      console.log(data)
      setMessages((messages) => [...messages, data])
    })

    socket.on('welcome', (data) => {
      console.log(data)
    })
  }, [])

  return (
    <div>
      <Container maxWidth='sm'>

        <Typography variant='h2' component='div' gutterBottom>
          Welcome to Socket.io
        </Typography>

        <Typography variant='h4' component='div' gutterBottom>
          {socketId}
        </Typography>

        <form onSubmit={joinRoomHandler}>
          <h5>Join Room</h5>
          <TextField value={roomName} onChange={e=>setRoomName(e.target.value)} id='joinRoom' label='Room Name' variant='outlined' />
          <Button type='submit' variant='contained' color='primary'>Join</Button>
        </form>

        <form onSubmit={handleSubmit}>
          <TextField value={message} onChange={e=>setMessage(e.target.value)} id='outlined-basic' label='Outlined' variant='outlined' />
          <TextField value={room} onChange={e=>setRoom(e.target.value)} id='room' label='Room' variant='outlined' />
          <Button type='submit' variant='contained' color='primary'>Send</Button>
        </form>

        <Stack>
          {
            messages.map((m, i) => (
              <Typography key={i} variant='h6' component='div' gutterBottom>
                {m.message}
              </Typography>
            ))
          }
        </Stack>

      </Container>
    </div>
  )
}

export default App