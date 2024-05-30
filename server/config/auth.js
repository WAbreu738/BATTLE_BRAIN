const { verify } = require('jsonwebtoken');

function isAuth({ req, res }) {
  const token = req.cookies?.token

  if (!token) return { req, res }

  try {
    const data = verify(token, process.env.JWT_SECRET)

    req.user = data

    return { req, res }

  } catch (error) {
    return { req, res }
  }
}

module.exports = { isAuth }

/*
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
                
*/