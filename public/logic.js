

const socket = io()

/* let room = ""
let name = ""
let isInRoom = false

window.onload = function () {
    setupListners()
}
function checkCommand() {
    const messageInput = document.querySelector('.room.ui input')
    const message = messageInput.value

    if (message[0] == "/") {
        console.log("Gör anrop till api och skicka bildurl")
    }
    console.log('value: ', message)
}

function deleteAllRooms() {
    socket.emit('delete all rooms')
}

function setupListners() {

    socket.on("rooms deleted", roomsDeleted)
    socket.on("join successful", loadChatUI) // () => {},är exakt samma sak
    socket.on("joined room", onJoinedRoom)
    socket.on("message", onNewMessage)
    socket.on("wrong password", wrongPassword)
}

function roomsDeleted(msg) {
    alert(msg)
}

function loadChatUI() {
    const joinUI = document.querySelector('.join.ui')
    const roomUI = document.querySelector('.room.ui')
    joinUI.classList.add('hidden')
    roomUI.classList.remove('hidden')
}

function onJoinedRoom(message) {
    const list = document.querySelector('.room.ui ul')
    const listItem = document.createElement('li')
    listItem.innerText = message

    list.appendChild(listItem)
    isInRoom = true
}

function onNewMessage(data) {
    const list = document.querySelector('.room.ui ul')
    const listItem = document.createElement('li')
    listItem.innerText = data.name + ": " + data.message

    list.appendChild(listItem)
}
function wrongPassword(msg) {
    alert(msg)
}

function onJoinRoom() {
    const [nameInput, roomInput, passwordInput] = document.querySelectorAll('.join.ui input')
    name = nameInput.value
    room = roomInput.value
    // man vill inte ha lösenord på clientsidan
    let password = passwordInput.value

    socket.emit('join room', { name, room, password })
}

function onSendMessage() {
    const messageInput = document.querySelector('.room.ui input')
    const message = messageInput.value

    socket.emit('message', {name, room, message})
    messageInput.value = ""
} */

/* socket.on('send giphy', function (img) {

    let fig = document.createElement('figure')
    let image = document.createElement('img')
    let fc = document.createElement('figcaption')

    image.src = img.content
    image.alt = img.text
    fc.textContent = img.type
    console.log(img)

    fig.appendChild(image)
    fig.appendChild(fc)

    let out = document.getElementById('imgBox')
    out.insertAdjacentElement('afterbegin', fig)

}) */

/* function printGiphy(data) {

    console.log(data)

    let giphyPic = data[0].images.downsized.url
    let giphyText = data[0].title

    socket.emit('send giphy', { type: giphyText, content: giphyPic })
} */

function printGiphy(giphy) {

    let fig = document.createElement('figure')
    let image = document.createElement('img')
    let fc = document.createElement('figcaption')

    image.src = giphy[0].images.downsized.url
    image.alt = giphy[0].title
    fc.textContent = giphy[0].title
    console.log(giphy)

    fig.appendChild(image)
    fig.appendChild(fc)

    let out = document.getElementById('imgBox')
    out.insertAdjacentElement('afterbegin', fig)
}


socket.on('chat message', function (msg) {
    
    if (msg.type == "text") {
        const chatList = document.getElementById('chatList')
        const newMessage = document.createElement('li')
        newMessage.innerText = msg.content
        chatList.append(newMessage)

    } else if (msg.type == "img") {
        let giphy = msg.content
        printGiphy(giphy)
    }

    console.log(msg)

})

async function sendMessage() {
    const message = document.getElementById("m").value

    if (message[0] == "/") {
        console.log("Gör anrop till api och skicka bildurl")

        const imageUrl = await getApi()
        socket.emit('chat message', { type: "img", content: imageUrl })
    } else {
        socket.emit('chat message', { type: "text", content: message })
    }

    clearInput()
}

/* function changeCommand() {
    const message = document.getElementById('m').value
    let popUp = document.querySelector('div')

    if (message[0] == "/") {
        popUp.innerText = message
        popUp.onclick = function () {
            sendMessage()
        }
    }
} */

function clearInput() {
    let clear = document.getElementById('m').value = ""
}

let APIKey = "vIhQ9o1NuNd44YbdSoHPl19gmhQ1OfTH"

async function getApi() {
    let url = `http://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=`
    let str = document.getElementById('m').value
    url = url.concat(str)
    console.log(url)

    const response = await fetch(url)
    const content = await response.json()

    return content.data
    /* return content.data[0].images.downsized.url */
}




/* fetch(url).then(response => {
    return response.json()
}).then(content => {
    if (content) {
        let data = content.data
         printGiphy(data)
        return data
    }
    // data, pagination, meta
    console.log('META', content.meta)
}).catch(err => {
    console.log(err)
}) */