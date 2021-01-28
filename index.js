const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use('/static', express.static('static'))

io.on('connection', socket => {
  // Global toast
  setInterval(() => { io.emit('global sync', 'Users have been synced') }, 6000)

  // User specific toast
  socket.on('user update', (msg) => {
    setTimeout(() => {
      io.to(socket.id).emit('user update', `Settings Updated for ${socket.id}`)
    }, 2000)
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
