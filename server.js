const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

//to verify jwt token before accessing data 
const verifyToken = require('./middleware/authMiddleware')

//routers 
const authRouter = require('./routes/authRoute')

//multer upload 
const {upload} = require('./middleware/multer')

const User = require('./model/userModel')



// dynamically loading environment variables from config.env
dotenv.config({ path: 'config.env' });

//connecting database 
mongoose.connect(process.env.DB_STRING, {}).then(() => {
  console.log('MongoDB connected!');
});


//to use express
const app = express();
const port = process.env.PORT || 3000;


app.use(cookieParser())
app.use(express.urlencoded())

// to use  static files from /public
app.use(express.static(path.join(__dirname, 'public')));

//middleware to define body property on req object
app.use(express.json());


// loading index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//authentication route - mounting
app.use('/user/signup',authRouter.signupRouter)
app.use('/user/login',authRouter.loginRouter)

//file routes
const fileRoutes = require('./routes/fileRoutes')
app.use('/upload',verifyToken,upload.single('file'),fileRoutes.uploadRouter)
app.use('/retrieve',verifyToken,fileRoutes.retrieveRouter)
app.use('/',fileRoutes.downloadRouter)

//signup with google
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20');

//set session storage
app.use(session({
  secret:'anystring',
  resave:false,
  saveUninitialized:true
}))

//initialise passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:'http://localhost:3000/auth/google/callback'
},async (accessToken,resetToken,profile,done)=>{
  const email = profile.emails[0].value
  let user = await User.findOne({email})
  if(!user){
    user = {
      googleId:profile.id,
      email:profile.emails[0].value,
      username:profile.displayName
    }
    user = await User.create(user)
  }
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  return done(null,{profile,token})
}))

app.get('/auth/google',passport.authenticate('google',{
  scope:['profile','email']
}))

app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
  const token = req.user.token

  res.redirect(`/token?token=${token}`)
})

app.get('/token',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/logout',(req,res)=>{
  req.logout(()=>{
    res.redirect('/')
  })
})

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
