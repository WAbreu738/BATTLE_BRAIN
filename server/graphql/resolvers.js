// pull the model (user)
const { withFilter, PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

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

    async getAvatar(_, args, context) {
      const user = await User.findById(context.req?.user.id)
      return user
    },

    getMessages: async (_, args, context) => {
      return await Message.find()
    },

    // getUserId: async (_, args, context) => {
    //   return context.req?.user.id
    // },

    // getUsername: async (_, args, context) => {
    //   return context.req?.user.username
    // }, 

    //===Whats needed: getHighestScore , getGamesWon, getGamesLost 
    getStats: async (_, args, context) => {
      const user = await User.findById(context.req?.user.id)
      return user
    }
  },

  Mutation: {
    registerUser: async (_, args, context) => {
      const newUser = await User.create({ username: args.username, password: args.password, profile: "" })
      const token = createToken(newUser)
      context.res.cookie('token', token, { httpOnly: true })
      //console.log(newUser)
      return newUser
    },

    loginUser: async (_, args, context) => {
      const user = await User.findOne({ username: args.username })
      const isMatch = await user.validatePass(args.password)
      if (isMatch) {
        const token = createToken(user)
        context.res.cookie('token', token, { httpOnly: true })
        return user
      }
      return null
    },

    addAvatar: async (_, args, context) => {
      const user = await User.findOneAndUpdate({ _id: context.req?.user.id }, { $set: { profile: args.profile } })
      return true
    },

    logoutUser: async (_, args, context) => {
      context.res.clearCookie('token')
      delete context.req.user
      return true
    },

    postMessage: async (_, { text, username }) => { // postMessage takes in the text and userId from the client
      const message = await Message.create({ text, username }) // create a new message with the text and userId
      pubsub.publish('MESSAGE_ADDED', { postCreated: message })

      return message
    },

    updateHighScore: async (_, { highScore }, context) => {
      const user = await User.findOneAndUpdate({ _id: context.req?.user.id }, { $set: { highScore: highScore } })
      return user
    }
  },

  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('MESSAGE_ADDED'),
        (payload, variables, context) => {
          // Only push an update if the comment is on
          // the correct repository for this operation
          return (
            // payload.commentAdded.repository_name === variables.repoFullName
            true
          );
        },
      ),
    },
  },
}

module.exports = resolvers