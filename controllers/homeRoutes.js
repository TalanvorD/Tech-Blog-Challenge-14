const router = require('express').Router();
const { User, Project } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try { 
    const project = await Project.findAll({ raw:true, order: [["name", "ASC"]] });
    res.render('homepage', { project });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Add a comment describing the functionality of the withAuth middleware
// Calles the withAuth middleware that checks to see if the user is logged in
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
  // TODO: Add a comment describing the functionality of this if statement
  // this checks the session storage for the logged_in variable. if true, redirect to the homepage route, otherwise render the login page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
