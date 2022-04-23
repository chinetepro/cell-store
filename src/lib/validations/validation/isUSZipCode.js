const isUSZipCode = value => {
  const isNumbers = /^\d+$/.test(value);
  if (!isNumbers || value.length !== 5) {
    return 'Must be a valid US zip code';
  }
  return false;
};

export default isUSZipCode;
