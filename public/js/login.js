const loginFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  // Stops the default behaviour of the form submit event
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  // Gets the value from the email-login and password-login fields, trims them and stores them to variables
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // TODO: Add a comment describing the functionality of this expression
    // Sends the email and password to the login route as stringified json. If successful, then sends the user to the /. otherwise gives a failed message
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
