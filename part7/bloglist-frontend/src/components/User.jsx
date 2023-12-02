import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import userService from '../services/users';

function User() {
  const { userId } = useParams();
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: [userId],
    queryFn: () => userService.getById(userId),
    staleTime: 900000,
  });

  if (isLoading) {
    return <p>Fetching User data. Please wait</p>;
  }

  if (isError) {
    return <p>Something unexpected with the server occurred: {error.message}</p>;
  }

  if (isSuccess) {
    return (
      <div>
        <h2>{data.name}</h2>
        <h3>Added Blogs</h3>
        {data.blogs.length === 0 ? (
          <p>Currently no blogs added</p>
        ) : (
          <ul>
            {data.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default User;
