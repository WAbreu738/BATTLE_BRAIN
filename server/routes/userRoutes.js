const user_router = require('express').Router()
const { sign, verify } = require('jsonwebtoken');
const User = require('../model/User')

function createToken(user) {
  return sign({ id: user._id }, process.env.JWT_SECRET)// Create a JWT token by signing the user's ID with the secret key
}

//get user by id
user_router.get("/", async (req, res) => {
  try {
    const token = req.cookies?.token // Get the token from the cookie
    if (!token) {
      return res.json({ user: null })
    }

    const data = verify(token, process.env.JWT_SECRET) // Verify the token

    const user = await User.findById(data.id)
    res.json({
      user: user
    })
  } catch (error) {
    console.log(error)
    res.json({ message: 'NUH UH:', error })

  }
});




user_router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    const token = createToken(newUser)
    res.cookie('token', token, { httpOnly: true }) //httpOnly prevents client-side JavaScript from reading the cookie data
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {

      const validationErrors = error.errors;

      const errorMessage = Object.keys(validationErrors)
        .map((key) => `${key} is required.`)
        .join(", ");
      res.status(400).send({ message: errorMessage });
    } else {
      res.status(500).send(error);
    }
  }
});

user_router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }
    const isMatch = await user.validatePass(password)
    if (!isMatch) {
      return res.json({
        message: "invalid password"
      })
    }

    const token = createToken(user) // Create a JWT token for the user
    res.cookie('token', token, { httpOnly: true })

    res.send(user)
  } catch (error) {
    console.log(error)
    res.send(error)
  }

})


//logout
user_router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' })
})


//auth 
function isAuth(req, res, next) {
  const token = req.cookies?.token // Get the token from the cookie
  if (!token) {
    return res.json({ message: 'NUH UH no token for you' })
  }

  try {
    const data = verify(token, process.env.JWT_SECRET) // Verify the token

    if (!data) {
      return res.json({ message: 'NUH UH' })
    }

    req.user = data // Set the user data in the request object
    next()

  } catch (error) {
    console.log(error)
    res.json({ message: 'NUH UH:', error })
  }
}

user_router.use(isAuth)


//PROTECTED ROUTES


module.exports = user_router