const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { pingTimeout: 25000 })

app.use(express.static(__dirname + '/public'))

/* let roomsWithPasswords = [] // {roomName: "tigerRum", password: "abcde }

function onConnection(socket) {

    console.log('Connected: ' + socket.id)

    socket.on('join room', (data) => {  // i datan skickas roomName och password med.

        let roomToJoin = passwords.find((room) => room.roomName == data.room)

        // Hittat ett rum att joina,
        if (roomToJoin) {
            // Lösenord matchar
            if (data.password == roomToJoin.password) {
                socket.join(data.room, () => {

                    io.to(socket.id).emit("join successful", "success") //io.to skickar ut meddelande till endast den clienten som försöker joina rummet. emit tar in två värden, nyckeln och meddelande.

                    io.to(data.room).emit("joined room", `${data.name} has joined the room`)
                })
                // Fel lösenord
            } else {
                socket.emit("Wrong password", "Fel lösenord, försök igen...")
            }
            // Skapa och joina nytt rum
        } else {
            socket.join(data.room, () => {
                roomsWithPasswords.push({
                    roomName: data.room,
                    password: data.password
                })
            })

            io.to(socket.id).emit("join successful", "success")
            io.to(data.room).emit("joined room", `${data.name} has joined the room`)
        }

        // Skicka ut meddelande till alla klienter i det aktuella rummet
        socket.on("message", (data) => {
            io.to(data.room).emit('message', data)
        })
    })

    // Ta bort alla rum
    socket.on('delete all rooms', () => {
        roomsWithPasswords = []
        socket.emit('rooms deleted', "all the romms has been deleted")
    })
}

io.on('connection', onConnection) */

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg)
    })
    /* socket.on('send giphy', (img) => {
        console.log('message: ' + img)
        io.emit('send giphy', img)
    }) */
})

http.listen(3000, 'localhost', () => {
    console.log('listening on port 3000')
})
