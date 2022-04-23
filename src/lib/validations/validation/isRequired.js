import {either, isEmpty, isNil} from 'ramda';

const isRequired = value => {
  return either(isEmpty, isNil, isEmpty)(typeof value === 'string' ? value.trim() : value) ? 'Required' : false;
};

export default isRequired;
