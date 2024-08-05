const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts to display on the homepage
router.get('/', async (req, res) => {
  try { 
    const postData = await Post.findAll({
      //where: { user_id: req.session.user_id },
      attributes: [ 'id', 'text', 'title', 'createdAt' ],
      include: [
          { model: Comment,
              attributes: [ 'id', 'text', 'post_id', 'user_id', 'createdAt' ],
              include: { model: User, attributes: [ 'name' ] }
          },
          { model: User, attributes: [ 'name' ] }
      ],
      order: [['id', 'ASC']],
  });
    
  const posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts);
  res.render('homepage', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Calls the withAuth middleware that checks to see if the user is logged in
/* router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      // this checks the session storage for the logged_in variable. if true, render the homepage
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get('/login', (req, res) => {
  // This checks the session storage for the logged_in variable. if true, redirect to the homepage route, otherwise render the login page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
