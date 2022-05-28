const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const { email, password } = req.body;

  try {
    // Checks in database if email exists
    const user = await UserAuth.findOne({ where: { email } });

    // if email exist then return fail message
    if (user) {
      return res.status(401).json({ status: false, message: 'User already exists in databse' });
    }

    // creating a salt for hashed password. change number for complexity
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    // email and hashed password is stored in database
    await UserAuth.create({
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ status: true, message: 'Registration Success' });
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Server Error' });
  }
};

/**
 * This function takes user email and password checks againts database
 * @param {*} req
 * @param {email} req.email - email given by user on login
 * @param {password} req.password - password given by user on login
 * @param {*} res
 * @returns json - with jwt token and status message
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserAuth.findOne({ where: { email } });
    const validUser = await bcrypt.compare(password, user.password);

    if (user && validUser) {
      // create jwt tokens
      // scret is used to create hash. TODO: encrypt secret
      const secret = 'thisisjwttoken12345';

      // token will have userid and expire in 30days
      const token = jwt.sign({ userid: user.id }, secret, { expiresIn: '7 days' });
      return res.status(200).json({ status: true, message: 'Login Success!!', token });
    }

    return res.status(401).json({ status: false, message: 'Email or Password is incorrect' });
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Server Error' });
  }
};
