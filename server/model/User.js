const { model, Schema } = require('mongoose')
// User Model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
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