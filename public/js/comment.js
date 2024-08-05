// Submits a new comment on a post to the comment route to be stored in the database
async function newCommentForm(event) {
    event.preventDefault();
    const text = document.querySelector('textarea[name="comment-text"]').value.trim();
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    if (text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ text, post_id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', newCommentForm);