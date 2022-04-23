import {AsYouType} from 'libphonenumber-js'

const isPhoneNumber = value => {
    let phoneNumber = new AsYouType('CU');
    phoneNumber.input(value);
    
    if (!phoneNumber.isValid()) {
        return 'Must be a valid phone number.';
    }
    return false;
};

export default isPhoneNumber;
