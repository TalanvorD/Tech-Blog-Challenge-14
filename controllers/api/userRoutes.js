const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all users from the database
router.get('/', async (req, res) => {
  try {
    const storedUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    const userData = storedUserData.map((users) => users.get({ plain: true }));
    res.status(200).json({ userData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get information for a single user from the database by id
router.get('/:id', async (req, res) => {
  try {
    const storedUserData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.params.id },
      include: [
        { model: Post, attributes: ['id', 'title', 'text', 'createdAt']
        },
        {
          model: Comment, attributes: ['id', 'text', 'createdAt'],
          include: { model: Post, attributes: ['title', 'post_id'] }
        }
      ]
    });
    const userData = storedUserData({ plain: true });
    res.status(200).json({ userData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new user for the database
router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.name = newUserData.name;
      req.session.email = newUserData.email;
      req.session.logged_in = true;
      res.status(200).json(newUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logs in the user
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches with the username in the database
    const storedUserData = await User.findOne({
      where: { email:  req.body.email }
    });
    // If there is no match with the username, response with an appropriate message
    if (!storedUserData) {
      res.status(400).json({ message: 'Incorrect e-mail, try again.' });
      return;
    }
    // Checks the password in the database 
    const checkPassword = await storedUserData.checkPassword(req.body.password);
    // If there's a problem with the password, send an appropriate message
    if (!checkPassword) {
      res.status(401).json({ message: 'Incorrect password, try again' });
      return;
    }
    // Saves the login state to for the session
    req.session.save(() => {
      req.session.user_id = storedUserData.id;
      req.session.email = storedUserData.email;
      req.session.name = storedUserData.name;
      req.session.logged_in = true;
      res.json({ user: storedUserData, message: 'You are now logged in!'});
    });
  } catch (error) {
    res.status(500).json({error: error, message: 'Something went wrong.'});
    console.log(error);
  }
});

// Logs out the user by destroying the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;