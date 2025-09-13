const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/userModel')

const login =  async function (req, res){
  const { email, password } = req.body;
  try {

    //finding user from database using email as filter object
    const user = await User.findOne({ email }).select('+password');

    //if no user with email returns "No user found!"
    if (!user) {
      return res.status(200).json({
        status: 'No user found!',
      });
    }

    //verifying password user entered with registered password
    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Password wrong',
      });
    }
    //if user is valid and password is correct then sign a new
    //jwt token to securely access server through token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      status: 'sucessfully authenticated',
      user,
      token,
    });
  } catch (err) {
    console.log(err);
  }
}

const signup = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;
  //if any one of property is missing returns missing data
  if (!username || !password || !confirmPassword || !email) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter missing data',
    });
  }
  //if password and confirm password didnt  match returns error
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Password Not matched',
    });
  } else {
    try {
      //hashing password using bcrypt
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 12); //password,salt
      req.body.password = hashedPassword;
      //creating a new user after signup
      const newUser = await User.create(req.body);
      //signing in a new token for user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        status: 'sucessfully recieved data',
        newUser,
        token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports  ={
    login,signup
}