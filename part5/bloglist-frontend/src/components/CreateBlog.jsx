import { useState } from 'react';

function CreateBlog({ onSubmit }) {
  const [newBlogDetails, setNewBLogDetails] = useState({ title: '', url: '' });

  const handleTitleValueChange = (event) => {
    setNewBLogDetails({ ...newBlogDetails, title: event.target.value });
  };

  const handleUrlValueChange = (event) => {
    setNewBLogDetails({ ...newBlogDetails, url: event.target.value });
  };

  const createBlog = async (event) => {
    event.preventDefault();
    const gotError = await onSubmit(newBlogDetails);
    if (!gotError) setNewBLogDetails({ title: '', url: '' });
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={createBlog}>
        <label htmlFor="title">
          Title:
          <input type="text" value={newBlogDetails.title} onChange={handleTitleValueChange} name="title" id="title" />
        </label>
        <label htmlFor="url">
          URL:
          <input type="text" value={newBlogDetails.url} onChange={handleUrlValueChange} name="url" id="url" />
        </label>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
