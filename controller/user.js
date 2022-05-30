const User = require('../model/user');
const UserPost = require('../model/userPost');

/**
 * Fetch latest 5 posts from database created by user.
 * If authorized then latest posts of user else home page of website.
 * @param {*} req
 * @param {*} res
 * @returns JSON value with latest 5 blogpost data created by user
 */
exports.getHome = (req, res) => {
  // identify user
  // fetch latest 5 post created by user from database
  // return
  res.json({
    title: 'first post',
    article: 'this is blog content',
    createdBy: 'Deepesh',
    createdDate: '23/04/2022',
  });
};

/**
 * Fetch all user posts from database
 * ADDON: Pagination
 * @param {*} req
 * @param {*} res
 * @returns JSON value with all blogpost data created by user
 */
exports.getUserPosts = (req, res) => {
  // identify user
  //const user = await User.findOne({ where: { userId: res.locals.userId } });
  // fetch all blogpost data created by user 
  
  // return
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
      });
    } else {
      await UserPost.create({
        title,
        author: user.firstName,
        content,
        status,
      });
    }

    return res.status(200).json({ status: true, message: 'Success!' });
  } catch (err) {
    return res.status(500).json({ status: false, message: `${err.name}` });
  }
};
