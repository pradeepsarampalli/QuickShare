const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token || token === 'null' || token === 'undefined') {
     return res.status(400).json({
      status:'Failed to execute operation! please relogin',
      message:'relogin to fix the issue'
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.id = decoded.id;
  //decoding failed cuz invalid token
  if (!decoded) {
    return res.status(400).json({
      status:'Failed to execute operation! please relogin',
      message:'relogin to fix the issue'
    });
}
  //passing to next middleware in middleware stack
  next();
};