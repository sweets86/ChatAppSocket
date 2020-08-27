const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { pingTimeout: 25000 })

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })
})

http.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})
