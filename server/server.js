
const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { WebSocketServer } = require('ws');
// const { useServer } = require('graphql-ws/lib/use/ws');
const cors = require('cors')
const client = require('./config/client')

const express = require('express')
const path = require('path')

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

const routes = require('./routes')

const app = express()

const httpServer = createServer(app)
app.use('/api', routes)


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
    uri: client.uri,
    headers: client.headers,
    context: isAuth
    // typeDefs,
    // resolvers
  })

  await apolloServer.start()

  app.use(
    '/graphql',

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

  if (process.env.PORT) {
    app.use(express.static('../client/dist'))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
  }

  httpServer.listen({ port: PORT }, () => {
    // console.log(apolloServer)
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
    console.log(`GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  })
}

startServer()
