import { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleUsernameValueChange = (event) => {
    setCredentials({ ...credentials, username: event.target.value });
  };

  const handlePasswordValueChange = (event) => {
    setCredentials({ ...credentials, password: event.target.value });
  };

  const login = (event) => {
    event.preventDefault();
    onSubmit(credentials);
  };

  return (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={login}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            value={credentials.username}
            onChange={handleUsernameValueChange}
            name="username"
            id="username"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={handlePasswordValueChange}
            name="password"
            id="password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
