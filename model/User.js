const {model, Schema} = require('mongoose')
// User Model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: Image
  },
  wins: {
    type: Number,
  },
  losses: {
    type: Number,
  }
})

const User = model('User', userSchema)

module.exports = User