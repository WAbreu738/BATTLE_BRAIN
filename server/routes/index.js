const router = require('express').Router()

const view_routes = require('./view_routes')
//other routes

// router.use('/', [view_routes, other routes])
router.use('/', view_routes)

module.exports = router