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
    profile: String
    highScore: Int
    gamesWon: Int
    gamesLost: Int
  }

  type Message {
    id: ID!
    text: String!
    username: String!
  }
  
  type Query {
    authenticate: User
    getMessages: [Message]
    getUser: User
    getStats: User
    getUserId: ID
    getUsername: String
    getAvatar: User
  }

  type Mutation {
    addAvatar(profile: String!): Boolean
    postMessage(text: String!, username: String): Message!
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
    logoutUser: Boolean
    updateHighScore(highScore: Int!) : User
    
  }

  type Subscription {
  messageAdded: Message
}
`;

module.exports = typeDefs
