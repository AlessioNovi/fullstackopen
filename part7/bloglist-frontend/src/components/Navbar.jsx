import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/userContext';
import useUser from '../hooks/userHook';

function Navbar() {
  const [user] = useContext(UserContext);
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      <span>
        {' '}
        {user.user.username} is logged in{' '}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </span>
    </div>
  );
}

export default Navbar;
