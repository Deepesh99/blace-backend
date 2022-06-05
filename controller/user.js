const User = require('../model/user');
const UserPost = require('../model/userPost');

/**
 * Fetch all posts from database published by all user.
 * @param {*} req
 * @param {*} res
 * @returns JSON value with latest 5 blogpost data created by user
 */
exports.getHome = async (req, res) => {
  // fetch latest 5 post created by user from database
  const post = await UserPost.findAll({ where: { status: 'published' } });

  // return
  res.status(200).json(post);
};

/**
 * Fetch all user posts from database
 * ADDON: Pagination
 * @param {*} req
 * @param {*} res
 * @returns JSON value with all blogpost data created by user
 */
exports.getUserPosts = async (req, res) => {
  // identify which users data is asked
  const { userId } = req.params;

  // fetch all blogpost data created by user
  const post = await UserPost.findAll({ where: { userId, status: 'published' } });

  // return
  res.status(200).json(post);
};

/**
 * Fetch User information from databse
 * @param {*} req
 * @param {*} res
 * @returns JSON value with user information
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { userId: res.locals.userId } });
    return res.json(user.dataValues);
  } catch (err) {
    return res.status(500).json({ status: false, message: `${err.name}` });
  }
};

/**
 * create a new item in "blogpost" table in databse
 * @param {*} req
 * @param {*} res
 */
exports.addNewPost = async (req, res) => {
  const {
    title, content, status,
  } = req.body;

  try {
    // identify user
    const user = await User.findOne({ where: { userId: res.locals.userId } });

    // add new data depending on status
    if (status === 'published') {
      await UserPost.create({
        title,
        author: user.firstName,
        publishedDate: new Date(),
        content,
        status,
        userId: user.userId,
      });
    } else {
      await UserPost.create({
        title,
        author: user.firstName,
        content,
        status,
        userId: user.userId,
      });
    }

    return res.status(200).json({ status: true, message: 'Success!' });
  } catch (err) {
    return res.status(500).json({ status: false, message: `${err.name}` });
  }
};
