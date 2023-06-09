const jwt = require('jsonwebtoken');
const secret= process.env.secretToken
module.exports = async (req, res, next) => {
   try {
    // console.log(req.headers)
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, secret);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
    //    console.log(userId)
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};