const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  googleId:String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select:false,
    required: function(){
      return !this.googleId
    },
  },
  token:String,
  files: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'UploadModel',
    },
  ],
});

//user model
module.exports = mongoose.model('User', userSchema);