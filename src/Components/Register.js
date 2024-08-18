import React, { useState } from 'react';
import '../stylesheets/index.css';
import { validateRegister } from '../scripts/validation';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(
      formValues.fullName,
      formValues.registerEmail,
      formValues.registerPassword,
      formValues.confirmPassword
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      const isEmailRegistered = existingUsers.some(
        (user) => user.email === formValues.registerEmail
      );

      if (isEmailRegistered) {
        setErrors({ formErrors: 'This email is already registered' });
        return;
      }

      const newUser = {
        id: Number(new Date()),
        fullName: formValues.fullName,
        email: formValues.registerEmail,
        password: formValues.registerPassword,
      };

      existingUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(existingUsers));

      console.log('Registration successful');
      navigate('/register-successful');
    }
  };

  return (
    <div className="container register-form-container">
      <h3>Register</h3>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="input-fields">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formValues.fullName}
            placeholder="Enter Fullname"
            onChange={handleChange}
          />
          {/* {errors.fullName && <span className="error">{errors.fullName}</span>} */}
        </div>
        <div className="input-fields">
          <label htmlFor="registerEmail">Email</label>
          <input
            type="email"
            name="registerEmail"
            id="registerEmail"
            value={formValues.registerEmail}
            placeholder="Enter email"
            onChange={handleChange}
          />
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
        </div>
        <div className="input-fields">
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
            value={formValues.registerPassword}
            placeholder="Enter password"
            onChange={handleChange}
          />
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
        </div>
        <div className="input-fields">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formValues.confirmPassword}
            placeholder="Re-Enter password"
            onChange={handleChange}
          />
          {/* {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>} */}
        </div>
        <div id="error-msg">
          {/* {isSubmitted && !Object.keys(errors).length ? "Registration successful!" : null} */}
          {errors.formErrors && <span className="error">{errors.formErrors}</span>}
        </div>
        <button className="register-btn btn-primary btn" id="signUp" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
