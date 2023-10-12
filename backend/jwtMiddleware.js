
const jwt = require('jsonwebtoken');

const secretKey = 'mysecretkeybaba';
function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(402).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    console.log('Decoded JWT:', decoded); 
    req.user = decoded;
    
    next();
  });
}
module.exports = {
  secretKey,
  verifyToken,
};
