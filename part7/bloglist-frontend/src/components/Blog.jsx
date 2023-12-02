import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs.js';

function Blog({ handleUpdate, loggedInUsername, handleDelete, handleComment }) {
  const { blogId } = useParams();
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: [blogId],
    queryFn: () => blogService.getById(blogId),
    staleTime: 900000,
  });

  const updateLikes = () => {
    const blogObj = {
      author: data.author,
      title: data.title,
      url: data.url,
      likes: data.likes,
      user: data.user.id,
    };
    handleUpdate(blogObj, data.id);
  };

  const deleteBlog = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Blog ${data.title} will deleted are you sure?`)) {
      handleDelete(data.id);
    }
  };

  const addComment = (event) => {
    event.preventDefault();
    handleComment(event.target.comment.value, blogId);
  };

  if (isLoading) {
    return <p>Fetching Blog data. Please wait</p>;
  }

  if (isError) {
    return <p>Something unexpected with the server occurred: {error.message}</p>;
  }

  if (isSuccess) {
    return (
      <div className="blog">
        <h1>
          Title: {data.title} By: {data.author}
        </h1>
        <p>Url: {data.url}</p>
        <p>
          Likes: {data.likes}{' '}
          <button type="button" onClick={updateLikes}>
            like
          </button>
        </p>
        {loggedInUsername === data.author && (
          <button type="button" onClick={deleteBlog}>
            Delete
          </button>
        )}
        <h3>Comments</h3>
        {loggedInUsername && (
          <form onSubmit={addComment}>
            <input name="comment" type="text" />
            <button type="submit">Add Comment</button>
          </form>
        )}
        {data.comments.map((comment, index) => (
          <li key={`Comment n.${index + 1} from ${data.author}`}>{comment}</li>
        ))}
      </div>
    );
  }
}

export default Blog;
