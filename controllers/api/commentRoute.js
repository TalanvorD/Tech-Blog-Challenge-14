const router = require('express').Router();
// const { response } = require('express'); not needed?
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments from the database after a withAuth check
router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    const comments = commentData.map((comment) => comment.get({ plain: true}));
    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creates a new comment in the database after a withAuth check
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });
    res.status(200).json({ commentData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Deletes a comment in the database after a withAuth check
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id : req.params.id }
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;