// pull the model (user)
const { withFilter, PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const User = require('../model/User')
const Game = require('../model/Game')
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

    // getMessages: async (_, args, context) => {
    //   return await Message.find()
    // },

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
    },

    pollGame: async (_, { gameId }, context) => {
      const id = context.req?.user.id;

      if (!id) throw new Error('Not Authorized');

      const game = await Game.findById(gameId)

      return game
    }
  },

  Mutation: {
    registerUser: async (_, args, context) => {
      const newUser = await User.create({ username: args.username, password: args.password, profile: "" })
      const token = createToken(newUser)
      context.res.cookie('token', token, { httpOnly: true })
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

    updateHighScore: async (_, { highScore }, context) => {
      const user = await User.findOneAndUpdate({ _id: context.req?.user.id }, { $set: { highScore: highScore } })
      return user
    },

    createGame: async (_, args, context) => {
      const id = context.req?.user.id
      console.log("current user", id)
      if (!id) throw new Error('You cannot perform this action.')

      const user = await User.findById(id)

      const game = await Game.create({
        playerOne: {
          player: user._id
        }
      })

      return game
    },

    joinGame: async (_, { gameId }, context) => {
      console.log("recieved gameId", gameId)
      const id = context.req?.user.id;

      console.log("userId", id)

      if (!id) throw new Error('Not Authorized');

      const game = await Game.findById(gameId)

      console.log("game", game)

      if (!game) {
        throw new Error('Game not found.');
      }

      if (game.playerTwo?.player) throw new Error('Cannot join. Game in progress.')

      game.playerTwo.player = id

      game.save()

      return true
    },

    postChat: async (_, { text, gameId }, context) => {
      const id = context.req?.user.id;

      if (!id) throw new Error('Not Authorized');

      const game = await Game.findById(gameId);
      const user = await User.findById(id)

      game.chats.push({ text, username: user.username });

      await game.save();

      return {
        message: 'Chat posted successfully!'
      }
    },

    attack: async (_, { gameId, isCorrect, amount, winner }, context) => {
      const id = context.req?.user.id;

      if (!id) throw new Error('Not Authorized');

      if (!isCorrect) return {
        message: 'No changes made.'
      }

      const game = await Game.findById(gameId)

      const isPlayerOne = game.playerOne.player = id

      if (isPlayerOne) {
        const score = game.playerTwo.score;
        game.playerTwo.score = score - amount;
      } else {
        const score = game.playerOne.score;
        game.playerOne.score = score - amount;
      }

      if (winner) {
        game.winner = id
      }

      await game.save()

      // take current game ,, assign it to a const , return it to the front end , so it know the game status

      return {
        message: 'Attack completed successfully!'
      }
    }
  }
}

module.exports = resolvers