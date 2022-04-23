
const minLength = length => value => {
  return value.length < length ? `Field must be at least ${length} characters.` : false;
};

export default minLength;
