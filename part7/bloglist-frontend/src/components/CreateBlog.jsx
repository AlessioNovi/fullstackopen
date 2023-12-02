import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
    try {
      await onSubmit(newBlogDetails);
      setNewBLogDetails({ title: '', url: '' });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={createBlog}>
        <TextField
          type="text"
          value={newBlogDetails.title}
          onChange={handleTitleValueChange}
          name="title"
          id="title"
          variant="standard"
          label="Title"
        />
        <TextField
          type="text"
          value={newBlogDetails.url}
          onChange={handleUrlValueChange}
          name="url"
          id="url"
          variant="standard"
          label="URL"
        />
        <Button variant="contained" size="small" type="submit">
          Create Blog
        </Button>
      </form>
    </div>
  );
}

export default CreateBlog;
