const { model, Schema } = require('mongoose')

const currentQuestionSchema = new Schema({
  question: {
    type: String,
    require: true,
    default: ""
  },

  correctAnswer: {
    type: String,
    require: true,
    default: ""
  },

  incorrectAnswers: {
    type: [String],
    require: true,
    default: []
  }
})

const chatSchema = new Schema({

  text: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const playerSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number,
    default: 3000
  }
})

const gameSchema = new Schema({
  playerOne: playerSchema,
  playerTwo: playerSchema,
  startGame: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: ""
  },
  difficulty: {
    type: String,
    default: ""
  },
  startBattle: {
    type: Boolean,
    default: false
  },
  isPlayerOneAnswered: {
    type: Boolean,
    default: false
  },
  isPlayerTwoAnswered: {
    type: Boolean,
    default: false
  },
  question: currentQuestionSchema,
  chats: [chatSchema],
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Game = model('Game', gameSchema)

module.exports = Game