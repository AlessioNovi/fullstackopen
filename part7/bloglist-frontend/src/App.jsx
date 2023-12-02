import { useEffect, useRef, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import User from './components/User';
import blogService from './services/blogs.js';
import LoginForm from './components/LoginForm';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import useNotification from './hooks/notificationHook';
import useUser from './hooks/userHook';
import UserContext from './context/userContext';
import Blog from './components/Blog';
import Navbar from './components/Navbar';

function App() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setNotificationMessage } = useNotification();
  const { login, checkIfTokenExists } = useUser();
  const [user] = useContext(UserContext);
  const createFormRef = useRef();
  const notificationRef = useRef();

  const CreateBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (data) => {
      queryClient.setQueryData(['blogs'], (old) => old.concat(data).sort((a, b) => b.votes - a.votes));
      setNotificationMessage(`A new blog ${data.title} has been created`);
      createFormRef.current.toggleVisibility();
      navigate('/');
    },
    onError: (error) => {
      setNotificationMessage(error.response.data.message, true);
    },
    onSettled: () => {
      notificationRef.current.scrollIntoView(false);
    },
  });

  const updateLikeMutation = useMutation({
    mutationFn: blogService.updateBlogLikes,
    onSuccess: (data) => {
      setNotificationMessage(`blog ${data.title} has been liked`);
      queryClient.invalidateQueries({ queryKey: [data.id] });
    },
    onError: (error) => {
      setNotificationMessage(error.response.data.message, true);
    },
    onSettled: () => {
      notificationRef.current.scrollIntoView(false);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (data) => {
      setNotificationMessage(`Blog deleted!`);
      navigate('/');
      queryClient.removeQueries([data]);
    },
    onError: (error) => {
      setNotificationMessage(error.response.data.message, true);
    },
    onSettled: () => {
      notificationRef.current.scrollIntoView(false);
    },
  });

  const commentBlogMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (data) => {
      setNotificationMessage(`Added New Comment!`);
      queryClient.setQueryData([data.id], (old) => {
        // eslint-disable-next-line no-param-reassign
        old.comments = data.comments;
        return old;
      });
    },
  });

  const handleLogin = async (credentialsObj) => {
    login(credentialsObj);
  };

  const handleCreateBlog = async (newBlogDetailsObj) => {
    await CreateBlogMutation.mutateAsync(newBlogDetailsObj);
  };

  const updateLikes = (blogObj, id) => {
    updateLikeMutation.mutate({ blogObj, id });
  };

  const deleteBlog = async (id) => {
    deleteBlogMutation.mutate(id);
  };

  const addComment = (comment, id) => {
    commentBlogMutation.mutate({ comment, id });
  };

  useEffect(() => {
    checkIfTokenExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={notificationRef}>
        <Notification />
      </div>
      {!user.isLoggedIn && (
        <Routes>
          <Route path="/login" element={<LoginForm onSubmit={handleLogin} />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
      {user.isLoggedIn && (
        <div>
          <Navbar />
          <h2>blogs App</h2>
          <Toggable buttonLabel="Show Create Form" cancelButtonLabel="Hide Form" ref={createFormRef}>
            <CreateBlog onSubmit={handleCreateBlog} />
          </Toggable>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<User />} />
            <Route
              path="/blogs/:blogId"
              element={
                <Blog
                  loggedInUsername={user.user.username}
                  handleUpdate={updateLikes}
                  handleDelete={deleteBlog}
                  handleComment={addComment}
                />
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
