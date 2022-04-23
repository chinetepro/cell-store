const isPassword = value => {
  if (!value) {
    return 'This field is required';
  }
  if (!value || !value.trim()) {
    return 'This field can\'t only be blank spaces';
  }
  if (!/^.{5,}$/.test(value))
    return 'This password is incorrect';
  return false;
};

export default isPassword;
