const { model, Schema } = require('mongoose')

const chatSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Chat = model('Chat', chatSchema)

module.exports = Chat