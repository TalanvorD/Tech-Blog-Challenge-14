// Submits a delete request to the route to remove a post from the database
async function deletePostButton(event){
    event.preventDefault();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('.delete-post-btn').addEventListener('click', deletePostButton);