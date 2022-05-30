const jwt = require('jsonwebtoken');
/**
 * This functions verifies jwt token is correct or not expired
 *  if true then next() else return error
 * @param {*} req - use jwt token from headers
 * @param {*} res
 * @param {*} next - goes to next controller function from route
 * @returns json - if error occurs
 */
exports.authorization = (req, res, next) => {
  // TODO: encrypt secret
  const secret = 'thisisjwttoken12345';

  try {
    const authToken = req.headers.token;
    const tokenData = jwt.verify(authToken, secret);

    // exp data from token is in UNIX timestanp so need to convert Date.now to same format.
    if (tokenData.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ status: false, message: 'Login expired' });
    }
    res.locals.userId = tokenData.userid;
    return next();
  } catch (err) {
    return res.status(401).json({ status: false, message: `${err.name}` });
  }
};
