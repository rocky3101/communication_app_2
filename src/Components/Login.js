import React, { useState } from 'react';
import '../stylesheets/index.css';
import { useNavigate } from 'react-router-dom';
import { validateLogin } from '../scripts/validation';

const Login = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserDetails = JSON.parse(localStorage.getItem("users")) || [];
    const { email, password } = formValues;

    const validationError = validateLogin(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    const user = storedUserDetails.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate('/login-successful');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container login-form-container">
      <h3>Login</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-fields">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="input-fields">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div id="login-error-msg">
          {error && <span className="error">{error}</span>}
        </div>
        <button className="login-btn btn-primary btn" id="signIn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


