import {isEmail, isUsername} from "../index";

const isUserNameOrEmail = value => {
  if (!isUsername(value) || !isEmail(value)) {
    return false;
  }
  return 'Invalid username or email';;
};

export default isUserNameOrEmail;
