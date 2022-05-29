exports.authorization = (req, res, next) => {
  // TODO: verify jwt tokens and assign userID if correct
  res.locals.userId = req.params.userId;
  next();
};
