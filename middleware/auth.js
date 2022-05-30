const jwt = require('jsonwebtoken');

exports.authorization = (req, res, next) => {
  const secret = 'thisisjwttoken12345';

  // TODO: verify jwt tokens and assign userID if correct
  try {
    const authToken = req.headers.token;
    const tokenData = jwt.verify(authToken, secret);

    if (tokenData.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ status: false, message: 'Login expired' });
    }
    res.locals.userId = tokenData.userid;
    return next();
  } catch (err) {
    return res.status(401).json({ status: false, message: `${err.name}` });
  }
};
