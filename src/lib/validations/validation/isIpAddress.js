import {either, isEmpty, isNil} from "ramda";

const isIpAddress = (value) => {
    if (either(isEmpty, isNil)(typeof value === 'string' ? value.trim() : value) || !/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(value)) {
        return 'Invalid ip address';
    }
    return false;
};

export default isIpAddress;
