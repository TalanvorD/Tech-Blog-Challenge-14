const logout = async () => {
  // TODO: Add a comment describing the functionality of this expression
  // Sends a request to the logout api
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // TODO: Add a comment describing the functionality of this statement
    // If the fetch was successful and logout occured, redirects to the login page
    document.location.replace('/login');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
