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
