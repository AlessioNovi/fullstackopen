import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';

import blogService from '../services/blogs.js';

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: 'solid',
//   borderWidth: 1,
//   marginBottom: 5,
//   listStyleType: 'none',
// };

function BlogList() {
  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  if (isLoading) {
    return <p>Fetching Blogs. Please wait</p>;
  }

  if (isError) {
    return <p>Something unexpected with the server occurred: {error.message}</p>;
  }

  if (isSuccess) {
    const blogs = data.sort((a, b) => b.likes - a.likes);

    return (
      <List>
        {blogs.map((blog) => (
          <ListItem key={blog.id} disablePadding>
            <ListItemButton>
              <Link to={`/blogs/${blog.id}`}>
                <ListItemText primary={blog.title} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default BlogList;
