import {either, isEmpty, isNil} from "ramda";

const isUrl = (value) => {
    try {
        if (either(isEmpty, isNil)(typeof value === 'string' ? value.trim() : value))
            return 'Invalid url address';
        new URL(value);
    } catch (_) {
        return 'Invalid url address';
    }
    return false;
};

export default isUrl;
