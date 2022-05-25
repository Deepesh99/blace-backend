const bcrypt = require('bcryptjs');

const UserAuth = require('../model/userAuth');

/**
 * This function takes user email checks with db; if new then register
 *   as new user in system with hashed password in database.
 * bcrypt used to hash password
 * @param {*} req
 * @param {email} req.email - email given by user on registering
 * @param {password} req.password - password set by user on registering
 * @param {*} res
 * @returns json - if user exist then status as false else true.
 */
exports.register = async (req, res) => {
  const email = await UserAuth.findOne({ where: { email: req.body.email } });

  if (email) {
    return res.status(401).json({ status: false, message: 'User already exists in databse' });
  }

  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await UserAuth.create({
    email: req.body.email,
    password: hashedPassword,
  });

  return res.status(200).json({ status: true, message: 'Registration Success' });
};
