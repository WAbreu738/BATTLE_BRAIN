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
    // typeDefs,
    // resolvers
  })

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
