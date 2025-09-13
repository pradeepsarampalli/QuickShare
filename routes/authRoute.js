const express = require('express')
const loginRouter = express.Router()
const signupRouter = express.Router()
const {login,signup} = require('../controller/authController')

loginRouter.route('/').post(login);
signupRouter.route('/').post(signup)

module.exports = {loginRouter,signupRouter}