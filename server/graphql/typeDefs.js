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

  type Chat {
    _id: ID
    text: String
    username: String
  }

  type GamePlayer {
    player: User
    score: Int
  }

  type Game {
    _id: ID
    playerOne: GamePlayer
    playerTwo: GamePlayer
    chats: [Chat]
    winner: User
  }

  type Response {
    message: String
  }

  type Query {
    authenticate: User
    getUser: User
    getStats: User
    # getUserId: ID
    # getUsername: String
    getAvatar: User
    pollGame(gameId: ID): Game
  }

  type Mutation {
    addAvatar(profile: String!): Boolean
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
    logoutUser: Boolean
    updateHighScore(highScore: Int!) : User
    createGame: Game
    joinGame(gameId: ID): Game
    postChat(text: String!, gameId: ID): Response
    attack(gameId: ID, isCorrect: Boolean, amount: Int, winner: Boolean): Response
  }
`;

module.exports = typeDefs
