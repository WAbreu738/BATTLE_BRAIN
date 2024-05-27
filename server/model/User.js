const { model, Schema } = require('mongoose')
const { hash, compare } = require('bcrypt')

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

// hash password before saving
userSchema.pre('save', async function () {
  this.password = await hash(this.password, 10)//hash is a bcrypt method
})





//validate password method
userSchema.methods.validatePass = async function (userPassword) {
  const valid = await compare(userPassword, this.password)//compare is a bcrypt method
}


const User = model('User', userSchema)

module.exports = User