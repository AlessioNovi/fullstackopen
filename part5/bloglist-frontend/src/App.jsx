import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import Toggable from './components/Toggable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState({
    username: '',
    isLoggedIn: false,
  });
  const [notificationMessage, setNotificationMessage] = useState({
    text: '',
    isError: false,
  });
  const createFormRef = useRef();
  const notificationRef = useRef();

  const handleLogin = async (credentialsObj) => {
    try {
      const user = await loginService.login(credentialsObj);
      blogService.setToken(user.token);
      setUserLoggedIn({ username: credentialsObj.username, isLoggedIn: true });
      setNotificationMessage({ isError: false, text: 'User Logged in' });
      window.localStorage.setItem('loggedUserDetails', JSON.stringify(user));
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
    } catch (error) {
      setNotificationMessage({
        isError: true,
        text: error.response.data.message,
      });
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserDetails');
    setUserLoggedIn({ username: '', isLoggedIn: false });
    blogService.setToken();
  };

  // eslint-disable-next-line consistent-return
  const handleCreateBlog = async (newBlogDetailsObj) => {
    try {
      await blogService.createBlog(newBlogDetailsObj);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setNotificationMessage({
        isError: false,
        text: `A new blog ${newBlogDetailsObj.title} has been created`,
      });
      createFormRef.current.toggleVisibility();
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
    } catch (error) {
      setNotificationMessage({
        isError: true,
        text: error.response.data.message,
      });
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
      return error;
    }
  };

  const updateLikes = async (blogObj, id) => {
    try {
      const updatedtBlog = await blogService.updateBlogLikes(blogObj, id);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      return updatedtBlog;
    } catch (error) {
      setNotificationMessage({
        isError: true,
        text: error.response.data.message,
      });
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
      return error;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setNotificationMessage({ isError: false, text: 'Blog has been deleted' });
      notificationRef.current.focus();
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
    } catch (error) {
      setNotificationMessage({
        isError: true,
        text: error.response.data.message,
      });
      setTimeout(() => {
        setNotificationMessage({ text: '', isError: false });
      }, 2000);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogsArr) => setBlogs(blogsArr.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const userDetails = window.localStorage.getItem('loggedUserDetails');
    if (userDetails) {
      const parsedUserDetails = JSON.parse(userDetails);
      setUserLoggedIn({
        username: parsedUserDetails.username,
        isLoggedIn: true,
      });
      blogService.setToken(parsedUserDetails.token);
    }
  }, []);

  return (
    <>
      <div ref={notificationRef}>{notificationMessage.text && <Notification message={notificationMessage} />}</div>
      {!userLoggedIn.isLoggedIn && <LoginForm onSubmit={handleLogin} />}
      {userLoggedIn.isLoggedIn && (
        <div>
          <h2>blogs</h2>
          <p>
            {userLoggedIn.username} is logged in{' '}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </p>
          <Toggable buttonLabel="Show Create Form" cancelButtonLabel="Hide Form" ref={createFormRef}>
            <CreateBlog onSubmit={handleCreateBlog} />
          </Toggable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdate={updateLikes}
              loggedInUsername={userLoggedIn.username}
              handleDelete={deleteBlog}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
