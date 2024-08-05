const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Calls the withAuth middleware that checks to see if the user is logged in
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
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

    res.render('dashboard', {
      posts,
      // This checks the session storage for the logged_in variable. if true, render the dashboard
      logged_in: req.session.logged_in,
      name: req.session.name
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to edit a post from the dashboard by post_id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [ 'id', 'post_text', 'title', 'createdAt' ],
            include: [
              {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'createdAt'],
                include: { model: User, attributes: ['name'] }
              },
              {
                model: User,
                attributes: ['name']
              }
            ]
          });
          const post = postData.get({ plain: true });
          res.render('edit-post', {
            post,
            logged_in: true,
            name: req.session.name
          });
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
    }
});

module.exports = router;
