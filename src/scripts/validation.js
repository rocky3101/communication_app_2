export const validateRegister = (fullName, email, password, confirmPassword) => {
  const errors = {};

  if (!fullName || !email || !password || !confirmPassword) {
    errors.formErrors = "Please enter all details";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.formErrors = "Email address is invalid";
  } else if (password.length < 8) {
    errors.formErrors = "Password must be at least 8 characters";
  } else if (password !== confirmPassword) {
    errors.formErrors = "Passwords do not match";
  }

  return errors;
};

export const validateLogin = (email, password) => {
  if (!email || !password) {
    return "Please enter all details";
  }
  return null;
};
