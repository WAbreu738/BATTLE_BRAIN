const router = require('express').Router()

const userRouter = require('./userRoutes')
//other routes

// router.use('/', [view_routes, other routes])
router.use('/', userRouter)

module.exports = router