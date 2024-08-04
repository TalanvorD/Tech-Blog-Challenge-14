const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // If the user is not logged in redirects to the login page
  // if they are logged in, passes to the next function in the chain
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
