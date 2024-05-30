// pull the model (user)
const Message = require('../model/Chat') // pull the model (message)
const User = require('../model/User')
const { sign, verify } = require('jsonwebtoken');

function createToken(user) {
  return sign({ id: user._id }, process.env.JWT_SECRET)// Create a JWT token by signing the user's ID with the secret key
}

const resolvers = {
  Query: {
    // Auth resolver
    async authenticate(_, args, context) {
      const id = context.req?.user.id
      if (!id) return null

      // Use the User model to grab the user by req.user_id
      const user = await User.findById(id)
      return user
    },

    getMessages: async (_, args, context) => {
      return await Message.find()
    },

    getUserId: async (_, args, context) => {
      return context.req?.user.id
    },

    getUsername: async (_, args, context) => {
      return context.req?.user.username
    }
  },

  Mutation: {
    registerUser: async (_, args, context) => {
      const newUser = await User.create(args)
      const token = createToken(newUser)
      context.res.cookie('token', token, { httpOnly: true })
      console.log(newUser)
      return newUser
    },

    loginUser: async (_, args, context) => {
      const user = await User.findOne({ username: args.username })
      const token = createToken(user)
      context.res.cookie('token', token, { httpOnly: true })
      return user
    },

    logoutUser: async (_, args, context) => {
      context.res.clearCookie('token')
      delete context.req.user
      return true
    },

    postMessage: async (_, { text, username }) => { // postMessage takes in the text and userId from the client
      const message = await Message.create({ text, username }) // create a new message with the text and userId

      return message
    },
  },
}

module.exports = resolvers