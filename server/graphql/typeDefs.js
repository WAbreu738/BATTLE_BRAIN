const gql = String.raw

const typeDefs = gql`
  type Stats {
    _id: ID
    gamesWon: Int
    highScore: Int
  }

  type User {
    _id: ID
    username: String
    stats: Stats
  }

  type Message {
    id: ID!
    text: String!
    user: User
  }

  type Query {
    authenticate: User
    getMessages: [Message]
    getUser: User
    getStats: Stats
    getUserId: ID
    getUsername: String
  }

  type Mutation {
    postMessage(text: String!, username: String): Message!
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
    logoutUser: Boolean
  }
`;

module.exports = typeDefs
