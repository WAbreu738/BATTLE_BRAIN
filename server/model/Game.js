const { model, Schema } = require('mongoose')

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