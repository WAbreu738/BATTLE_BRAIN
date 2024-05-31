const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const cors = require('cors')


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

//setting up socket to attatch to http server with app
// const http = require('http')
// const socketIo = require('socket.io')
const app = express()
// const server = http.createServer(app)
// const io = socketIo(server, {
//   path: '/socket'
// })

const Chat = require('./model/Chat')
const User = require('./model/User')

const httpServer = createServer(app)

//middlewares
//app.use(cors(corsOptions));


//when the socket is connected, on message the active cookies are parsed
// io.on('connection', (socket) => {
//   console.log('user connected')
//   socket.on('msg', async (msg) => {
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
//     io.emit('chat', { msg: msg })
//   })
// })

//probably dont need these
//app.use(express.urlencoded({ extended: true }))

//app.use(bodyParser.json());

app.use('/api', routes)

//Testing for socket
// socketServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


async function startServer() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    // typeDefs,
    // resolvers
  })

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });

  const findUser = async (authToken) => {
    // Find a user by their auth token
    console.log('User token', authToken)
    return authToken
  };

  const getDynamicContext = async (ctx, msg, args) => {
    if (ctx.connectionParams.authentication) {
      const currentUser = await findUser(ctx.connectionParams.authentication);
      return { currentUser };
    }
    // Let the resolvers know we don't have a current user so they can
    // throw the appropriate error
    return { currentUser: null };
  };

  // ...
  // useServer(
  //   {
  //     // Our GraphQL schema.
  //     schema,
  //     context: async (ctx, msg, args) => {
  //       // This will be run every time the client sends a subscription request
  //       console.log('context', ctx)
  //       return getDynamicContext(ctx, msg, args);
  //     },
  //     onConnect: async (ctx) => {
  //       // Check authentication every time a client connects.
  //       console.log('onconnect', ctx)
  //       // if (tokenIsNotValid(ctx.connectionParams)) {
  //       //   // You can return false to close the connection  or throw an explicit error
  //       //   throw new Error('Auth token missing!');
  //       // } else {
  //       //   console.log('Your connected!')
  //       // }
  //       return {}
  //     },
  //     onDisconnect(ctx, code, reason) {
  //       console.log('Disconnected!');
  //     },
  //   },
  //   wsServer,
  // );


  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({
    schema,
    context: async (ctx, msg, args) => {
      // This will be run every time the client sends a subscription request
      console.log('context', ctx)
      return getDynamicContext(ctx, msg, args);
    },
    onConnect: async (ctx) => {
      // Check authentication every time a client connects.
      console.log('onconnect', ctx)
      // if (tokenIsNotValid(ctx.connectionParams)) {
      //   // You can return false to close the connection  or throw an explicit error
      //   throw new Error('Auth token missing!');
      // } else {
      //   console.log('Your connected!')
      // }
      return {}
    },
    onDisconnect(ctx, code, reason) {
      console.log('Disconnected!');
    },
  }, wsServer);

  await apolloServer.start()

  app.use(
    '/graphql',
    // cors({
    //   origin: 'http://localhost:5173'
    // }),

    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
    express.json(),
    cookieParser(),
    expressMiddleware(apolloServer, {
      context: isAuth
    })
  )

  httpServer.listen({ port: PORT }, () => {
    // console.log(apolloServer)
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
    console.log(`Subscription endpoit ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
    console.log(`GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  })
}

startServer()
