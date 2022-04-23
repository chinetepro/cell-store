const isUsername = value => {
  // eslint-disable-next-line
  if (!/^(([a-z]+[a-z0-9_]*){3,20}$)/.test(value)) {
    return 'Invalid user name';
  }
  return false;
};

export default isUsername;
