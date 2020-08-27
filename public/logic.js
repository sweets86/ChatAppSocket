

const socket = io()

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
}