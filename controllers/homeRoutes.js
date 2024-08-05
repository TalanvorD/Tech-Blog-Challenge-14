const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Route to get all posts to display on the homepage
router.get('/', async (req, res) => {
  try { 
    const postData = await Post.findAll({
      attributes: [ 'id', 'title', 'text', 'createdAt' ],
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
  res.render('homepage', { 
    posts,
    logged_in: req.session.logged_in,
    name: req.session.name
   });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display a single post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: [ 'id', 'title', 'text', 'createdAt' ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'text', 'post_id', 'user_id', 'createdAt'],
          include: { model: User, attributes: ['name'] }
        },
        { model: User, attributes: ['name'] }
      ]
    });
    const post = postData.get({ plain: true });
    res.render('onePost', {
      post,
      logged_in: req.session.logged_in,
      email: req.session.email,
      name: req.session.name
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({error : err, message : 'Something went wrong.'});
  }
});

  // Checks the session storage for the logged_in variable. if true, redirect to the homepage route, otherwise render the login page
router.get('/login', (req, res) => {
  try {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
    }
    res.render('login');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Checks the session storage for the logged_in variable. if true, redirect to the homepage route, otherwise render the signup page
router.get('/signup', (req, res)=> {
  try {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
