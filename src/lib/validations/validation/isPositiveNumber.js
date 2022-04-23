const isPositiveNumber = value => {
  if (value < 0) {
    return 'Must be a number';
  }
  return false;
};

export default isPositiveNumber;
