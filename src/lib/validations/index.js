import isEmail from './validation/isEmail';
import isName from './validation/isName';
import isRequired from './validation/isRequired';
import isNumber from './validation/isNumber';
import confirmPassword from './validation/confirmPassword';
import isPhoneNumber from './validation/isPhoneNumber';
import isPositiveNumber from './validation/isPositiveNumber';
import isUSZipCode from './validation/isUSZipCode';
import minLength from './validation/minLength';
import isPassword from './validation/isPassword';
import isUsername from './validation/isUsername';
import isIpAddress from './validation/isIpAddress';
import isUrl from './validation/isUrl';
import isUsernameOrEmail from './validation/isUsernameOrEmail';
import getFieldValue from './helpers/getFieldValue';
import hasError from './helpers/hasError';


const validation = params => values => {
  const errors = {};
  const fields = Object.keys(params);

  fields.forEach(field => {
    const value = values[field];
    const action = params[field];

    if (Array.isArray(action)) {
      const actionLength = action.length;

      for (let i = 0; i < actionLength; i += 1) {
        const error = action[i](value, values);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    } else {
      const error = action(value,values);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

export {
  validation as default,
  isRequired,
  isEmail,
  isNumber,
  isName,
  confirmPassword,
  isPhoneNumber,
  isPositiveNumber,
  isUSZipCode,
  minLength,
  isPassword,
  isUsername,
  isIpAddress,
  isUrl,
  isUsernameOrEmail,
  getFieldValue,
  hasError
};
