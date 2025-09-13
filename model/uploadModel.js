const mongoose = require('mongoose')
//file schema
const uploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filesize: {
    type: Number,
  },
  uniqueCode: {
    type: String,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:300
  }
});
//file model
module.exports =  mongoose.model('UploadModel', uploadSchema);