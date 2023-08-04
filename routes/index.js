'use strict'
const router = require('express').Router()
const userRouter = require('./user')

// /api/v1
router.use('/user', userRouter)

module.exports = router