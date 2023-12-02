import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import userService from '../services/users';

function UserList() {
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  if (isLoading) {
    return <p>Fetching Blogs. Please wait</p>;
  }

  if (isError) {
    return <p>Something unexpected with the server occurred: {error.message}</p>;
  }

  if (isSuccess) {
    const users = data.sort((a, b) => b.blogs.length - a.blogs.length);
    return (
      <>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th>User</th>
              <th>Blogs Created</th>
            </tr>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default UserList;
