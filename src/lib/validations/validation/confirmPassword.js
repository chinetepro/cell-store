const confirmPassword = (confirmPass, values) => {
  if (confirmPass !== values.password) {
    return 'Passwords do not match';
  }
  return false;
};

export default confirmPassword;
