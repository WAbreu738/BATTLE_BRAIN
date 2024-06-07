// pull the model (user)

const User = require("../model/User");
const Game = require("../model/Game");
const { sign, verify } = require("jsonwebtoken");

function createToken(user) {
  return sign({ id: user._id }, process.env.JWT_SECRET); // Create a JWT token by signing the user's ID with the secret key
}

//we create a function that fetches the question from the api
// then we pull it into one of our mutation , query
// and then we pull that query/mutation into our front end

const resolvers = {
  Query: {
    // Auth resolver
    async authenticate(_, args, context) {
      const id = context.req?.user.id;
      if (!id) return null;

      // Use the User model to grab the user by req.user_id
      const user = await User.findById(id);
      return user;
    },

    async getAvatar(_, args, context) {
      const user = await User.findById(context.req?.user.id);
      return user;
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
      const user = await User.findById(context.req?.user.id);
      return user;
    },

    getGame: async (_, { gameId }, context) => {
      if (gameId !== '') {
        const game = await Game.findById(gameId);
        return game;
      }
      return
    },

    pollGame: async (_, { gameId }, context) => {
      const id = context.req?.user.id;
      //console.log(gameId)
      if (!id) throw new Error("Not Authorized");
      if (gameId !== '') {
        const game = await Game.findById(gameId)
          .populate("playerOne.player")
          .populate("playerTwo.player")
          .populate("question")
          .populate("winner");

        return game;
      }
      return

      //console.log(game)


    },

    getLeaderboard: async (_, args, context) => {
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
    registerUser: async (_, args, context) => {
      const newUser = await User.create({
        username: args.username,
        password: args.password,
        profile: "",
      });
      const token = createToken(newUser);
      context.res.cookie("token", token, { httpOnly: true });
      return newUser;
    },

    loginUser: async (_, args, context) => {
      const user = await User.findOne({ username: args.username });
      const isMatch = await user.validatePass(args.password);
      if (isMatch) {
        const token = createToken(user);
        context.res.cookie("token", token, { httpOnly: true });
        return user;
      }
      return null;
    },

    addAvatar: async (_, args, context) => {
      const user = await User.findOneAndUpdate(
        { _id: context.req?.user.id },
        { $set: { profile: args.profile } }
      );
      return true;
    },

    logoutUser: async (_, args, context) => {
      context.res.clearCookie("token");
      delete context.req.user;
      return true;
    },

    updateHighScore: async (_, { highScore }, context) => {
      //console.log("you got here")
      const user = await User.findOneAndUpdate(
        { _id: context.req?.user.id },
        { $set: { highScore: highScore } }
      );
      return user;
    },

    createGame: async (_, args, context) => {
      const id = context.req?.user.id;
      //console.log("current user", id);
      if (!id) throw new Error("You cannot perform this action.");

      const user = await User.findById(id);

      const game = await Game.create({
        playerOne: {
          player: {
            _id: user._id,
            username: user.username,
            profile: user.profile,
          },
        },
        //find a better way to do this that isnt setting dummy id?
        playerTwo: {
          player: {
            _id: user._id,
            username: user.username,
            profile: user.profile,
          },
        },
      });

      return game;
    },

    userLeaveGame: async (_, { gameId, user }) => {
      if (user === "playerOne") {
        const updatedGame = await Game.findByIdAndUpdate(gameId, {
          $set: { "playerOne.player": null }
          ,
        })
      }
      if (user === "playerTwo") {
        const updatedGame = await Game.findByIdAndUpdate(gameId, {
          $set: { "playerTwo.player": null }
        })
      }

      return true
    },

    deleteGame: async (_, { gameId }, context) => {
      await Game.deleteOne({ _id: gameId })
      return true
    },

    joinGame: async (_, { gameId }, context) => {
      if (gameId !== "") {
        const id = context.req?.user.id;
        const user = await User.findById(id);

        if (!id) throw new Error("Not Authorized");

        const game = await Game.findById(gameId)
          .populate("playerOne.player")
          .populate("playerTwo.player");

        if (!game) {
          throw new Error("Game not found.");
        }

        if (game.playerTwo.player._id.equals(game.playerOne.player._id)) {
          const updatedGame = await Game.findByIdAndUpdate(gameId, {
            "playerTwo.player": user._id,
          })
            .populate("playerOne.player")
            .populate("playerTwo.player");
          updatedGame.save();

          //console.log("New Game:", updatedGame);
        } else {
          throw new Error("Cannot join. Game in progress.");
        }

        return {
          message: "Game join success!",
        };
      }
      return
    },

    startGame: async (_, { gameId, startGame }, context) => {
      if (gameId !== '') {
        const game = await Game.findByIdAndUpdate(gameId, {
          $set: { startGame: startGame },
        });
        game.save();
        return game.startGame;
      }
      return
    },

    startBattle: async (_, { gameId, startBattle }, context) => {
      const game = await Game.findByIdAndUpdate(gameId, {
        $set: { startBattle: startBattle },
      });
      game.save();
      return game.startBattle;
    },

    gameSettings: async (_, { gameId, category, difficulty }, context) => {
      const game = await Game.findByIdAndUpdate(gameId, {
        $set: { category: category, difficulty: difficulty },
      });
      return game;
    },

    postChat: async (_, { text, gameId }, context) => {
      const id = context.req?.user.id;

      if (!id) throw new Error("Not Authorized");

      const game = await Game.findById(gameId);
      const user = await User.findById(id);

      game.chats.push({ text, username: user.username });

      await game.save();

      return {
        message: "Chat posted successfully!",
      };
    },

    currentQuestion: async (_, { gameId }, context) => {
      // console.log(gameId);
      const gameOptions = await Game.findById(gameId);
      const category = gameOptions.category;
      const difficulty = gameOptions.difficulty;
      const url = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=1&{difficulties=${difficulty}`;
      const headers = {
        // "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
        "X-API-Key": process.env.API_KEY,
      };

      let question;
      let correctAnswer;
      let incorrectAnswers;

      try {
        const response = await fetch(url, { headers: headers });
        const data = await response.json();
        question = data[0].question.text;
        correctAnswer = data[0].correctAnswer;
        incorrectAnswers = data[0].incorrectAnswers;
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
      }

      const game = await Game.findByIdAndUpdate(gameId, {
        "question.question": question,
        "question.correctAnswer": correctAnswer,
        "question.incorrectAnswers": incorrectAnswers,
      }).populate("question");
      return true;
    },

    multiplier: async (_, { gameId, multiplier }, context) => {
      console.log("Multiplier:", multiplier)
      // console.log("Multiplier:", multiplier)
      const game = await Game.findByIdAndUpdate(gameId, { multiplier: multiplier })
      return true
    },

    resetIsAnswered: async (_, { gameId }, context) => {
      const game = await Game.findById(gameId);
      game.isPlayerOneAnswered = false
      game.isPlayerTwoAnswered = false
      await game.save();
      return true
    },

    bothAnswered: async (_, { gameId }, context) => {
      const id = context.req?.user.id;
      const game = await Game.findById(gameId);

      const isPlayerOne = (game.playerOne.player._id.equals(id));

      if (isPlayerOne) {
        game.isPlayerOneAnswered = true
      } else {
        game.isPlayerTwoAnswered = true
      }

      await game.save();

      return true
    },

    attack: async (_, { gameId, isCorrect, amount }, context) => {
      const id = context.req?.user.id;

      if (!id) throw new Error("Not Authorized");

      if (!isCorrect)
        return {
          message: "Attack Failed",
        };

      const game = await Game.findById(gameId);

      const isPlayerOne = (game.playerOne.player._id.equals(id));

      let winner;

      if (isPlayerOne) {
        game.isPlayerOneAnswered = true
        const previousScore = game.playerTwo.score;
        const newScore = previousScore - amount;
        game.playerTwo.score = newScore < 0 ? 0 : newScore;

        winner = game.playerTwo.score === 0;
      } else {
        game.isPlayerTwoAnswered = true
        const previousScore = game.playerOne.score;
        const newScore = previousScore - amount;
        game.playerOne.score = newScore < 0 ? 0 : newScore;

        winner = game.playerOne.score === 0;
      }

      if (winner) {
        game.winner = id;
      }

      await game.save();

      // take current game ,, assign it to a const , return it to the front end , so it know the game status

      return game.winner
    },

    resetGame: async (_, { gameId }, context) => {
      const game = await Game.findByIdAndUpdate(gameId, {
        $set: { winner: null, isPlayerOneAnswered: false, isPlayerTwoAnswered: false, category: "", difficulty: "", "question.question": "", "question.correctAnswer": "", "question.incorrectAnswers": [], "playerTwo.score": 3000, "playerOne.score": 3000 },
      });
      return true
    },
  },
};

module.exports = resolvers;
