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

  type Question {
    question: String
    correctAnswer: String
    incorrectAnswers: [String]
  }

  type Game {
    _id: ID
    playerOne: GamePlayer
    playerTwo: GamePlayer
    startGame: Boolean
    startBattle: Boolean
    category: String
    difficulty: String
    question: Question
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
    getGame(gameId: ID): Game
    pollGame(gameId: ID): Game
    getLeaderboard: [User]
  }

  type Mutation {
    addAvatar(profile: String!): Boolean
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
    logoutUser: Boolean
    updateHighScore(highScore: Int!) : User
    createGame: Game
    joinGame(gameId: ID): Game
    startGame( gameId: ID, startGame: Boolean): Boolean
    startBattle( gameId: ID, startBattle: Boolean): Boolean
    gameSettings(gameId: ID, category: String, difficulty: String): Game
    currentQuestion(gameId: ID): Boolean
    postChat(text: String!, gameId: ID): Response
    attack(gameId: ID, isCorrect: Boolean, amount: Int, winner: Boolean): Game
  },
`;

module.exports = typeDefs
