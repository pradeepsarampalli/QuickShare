const express = require('express')
const {upload,retrieve,download} = require('../controller/fileController')

const uploadRouter = express.Router()
const retrieveRouter = express.Router()
const downloadRouter = express.Router()

uploadRouter.route('/').post(upload)
retrieveRouter.route('/').post(retrieve)
downloadRouter.route('/download/:filename').get(download)

module.exports = {uploadRouter,downloadRouter,retrieveRouter}
