const express = require('express')

const PORT = process.env.PORT || 3000

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const cookieParser = require('cookie-parser')
const cookie = require('cookie')

require('dotenv').config()

//pull resolvers and typeDefs 
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const { isAuth } = require('./config/auth')


//packages for db

const routes = require('./routes')

//require routes
const client = require('./config/client')

const cors = require('cors')
//setting up socket to attatch to http server with app
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  path: '/socket'
})

const Chat = require('./model/Chat')
const User = require('./model/User')

//middlewares
//app.use(cors(corsOptions));


//when the socket is connected, on message the active cookies are parsed
io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('msg', async (msg) => {
    //const cookies = cookie.parse(socket.request.headers.cookie)

    //if there is a token cookie, create a chat when prompted
    // if (cookies.token) {
    //   const token = JSON.parse(cookies.token) //.slice(2) to cut something from the token

    //   // await Chat.create({
    //   //   text: msg,
    //   //   user: token
    //   // })
    //   //const user = await User.findById(token).select('username')
    //   //io.emit('chat', { msg: msg, token: token })
    // }
    io.emit('chat', { msg: msg })
  })
})

//probably dont need these
//app.use(express.urlencoded({ extended: true }))

//app.use(bodyParser.json());

app.use('/api', routes)

//Testing for socket
// socketServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()

  app.use(
    '/graphql',
    // cors({
    //   origin: 'http://localhost:5173'
    // }),
    express.json(),
    cookieParser(),
    expressMiddleware(apolloServer, {
      context: isAuth
    })
  )

  server.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  )
}

startServer()
