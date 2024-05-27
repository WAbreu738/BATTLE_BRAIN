const user_router = require('express').Router()
import { sign, verify } from 'jsonwebtoken'
const User = require('../model/User')

function createToken(user) {
  return sign({ id: user._id }, process.env.JWT_SECRET)// Create a JWT token by signing the user's ID with the secret key
}

user_router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body) // Create a new user
    // const token = 

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Extract validation errors from the error object
      const validationErrors = error.errors;
      // Construct a more user-friendly error message
      const errorMessage = Object.keys(validationErrors)
        .map((key) => `${key} is required.`)
        .join(", ");
      res.status(400).send({ message: errorMessage });
    } else {
      res.status(500).send(error);
    }
  }
});
module.exports = user_router