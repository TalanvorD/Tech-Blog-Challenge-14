const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts from the database after a withAuth check
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [ 'id', 'title', 'text', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'text', 'post_id', 'user_id', 'createdAt'],
          include: { model: User, attributes: ['name'] }
        },
        {
          model: User, attributes: ['name']
        }
      ]
    })
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get specific post from the database after a withAuth check
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: [ 'id', 'title', 'text', 'createdAt'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'text', 'post_id', 'user_id', 'createdAt'],
          include: { model: User, attributes: ['name'] }
        },
        {
          model: User, attributes: ['name']
        }
      ]
    });
    const onepost = postData.get({ plain: true });
    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Create a new post for the database after a withAuth check
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id
    });
    res.status(200).json({ postData, message: 'Post created!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a specific post in the database after a withAuth check
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a specific post from the database after a withAuth check
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where:
      {id : req.params.id}
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;