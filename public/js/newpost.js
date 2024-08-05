// Submits a post request to the route to store a new post in the database
async function newPostForm(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const text = document.querySelector('textarea[name="post-text"]').value;
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

  document.querySelector('.new-post-form').addEventListener('submit', newPostForm);