import { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

function Blog({ blog, handleUpdate, loggedInUsername, handleDelete }) {
  const [detailsVisbile, setdetailsVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetails = () => setdetailsVisible(!detailsVisbile);

  const updateLikes = async () => {
    const blogObj = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes,
      user: blog.user.id,
    };
    const updatedBlog = await handleUpdate(blogObj, blog.id);
    setLikes(updatedBlog.likes);
  };

  const deleteBlog = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Blog ${blog.title} will deleted are you sure?`)) {
      await handleDelete(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <p>
        Title: {blog.title} By: {blog.author}
        <button type="button" onClick={toggleDetails}>
          {detailsVisbile ? 'Hide' : 'Show'}
        </button>
      </p>
      {detailsVisbile && (
        <>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {likes}{' '}
            <button type="button" onClick={updateLikes}>
              like
            </button>
          </p>
          {loggedInUsername === blog.author && (
            <button type="button" onClick={deleteBlog}>
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Blog;
