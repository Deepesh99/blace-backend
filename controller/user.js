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
  //return 
  res.json({
    title: "first post",
    article: "this is blog content",
    createdBy: "Deepesh",
    createdDate: "23/04/2022",
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
  // fetch all blogpost data created by user
  // return
};

/**
 * Fetch User information from databse
 * @param {*} req 
 * @param {*} res 
 * @returns JSON value with user information
 */
exports.getUser = (req, res) => {
  // identify user
  // fetch user info
  // return
};

/**
 * create a new item in "blogpost" table in databse 
 * @param {*} req 
 * @param {*} res
 */
exports.addNewPost = (req, res) => {
  // identify user
  // create new db item in "blogpost" table
  // return 
};