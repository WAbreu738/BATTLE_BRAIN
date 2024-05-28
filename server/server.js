const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

const cookieParser = require('cookie-parser')
const cookie = require('cookie')

require('dotenv').config()

// Custom CORS middleware
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or local development)
//     if (!origin) return callback(null, true);
//     // Allow requests from localhost:5173
//     if (origin === "http://localhost:5173") return callback(null, true);
//     // Allow requests from other origins (for development/testing)
//     // Replace '*' with your specific domain in production
//     callback(null, true);
//   },
//   credentials: true,
// };

//packages for db


const bodyParser = require('body-parser')
const routes = require('./routes')

//require routes
const client = require('./config/client')

//setting up socket to attatch to http server with app
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const Chat = require('./model/Chat')
const User = require('./model/User')

//middlewares
//app.use(cors(corsOptions));
app.use(cookieParser())

//when the socket is connected, on message the active cookies are parsed
io.on('connection', (socket) => {
  socket.on('message', async (msg) => {
    const cookies = cookie.parse(socket.request.headers.cookie)
    //if there is a token cookie, create a chat
    if (cookies.token) {
      const token = JSON.parse(cookies.token) //.slice(2) to cut something from the token

      await Chat.create({
        text: msg,
        user: token
      })
      //const user = await User.findById(token).select('username')
      //io.emit('chat', { message: msg, user: user.username })
    }
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use('/api', routes)

client.once('open', () => {
  console.log('Database Connected')
  app.listen(PORT, () => console.log('Server listening port', PORT))
}) 