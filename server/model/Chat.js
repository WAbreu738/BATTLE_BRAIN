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

const Chat = model('Chat', chatSchema)

module.exports = Chat