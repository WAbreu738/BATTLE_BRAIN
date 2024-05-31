const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

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
  profile: {
    type: String
  },
  highScore: {
    type: Number
  },
  gamesWon: {
    type: Number

  },
  gamesLost: {
    type: Number

  },

})

// hash password before saving
userSchema.pre('save', async function (next) {
  //check if (this.isNew) to ensure that you only encrypt if the user has not been added to the database. Otherwise it will encrypt on any and all user changes
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()

})

//validate password method
async function comparePasswords(password) {

  return bcrypt.compareSync(password, this.password)

}

userSchema.methods.validatePass = comparePasswords;

const User = model('User', userSchema)

module.exports = User