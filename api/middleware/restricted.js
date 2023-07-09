const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../secrets');


module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token) {
    res.status(401).json({message: 'token gereklidir'})
  } else {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      if(error) {
        res.status(401).json({message: "token geçersizdir"})
      } else {
        req.decodedToken = decodedToken;
        next()
      }
    })
  }
  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
};
