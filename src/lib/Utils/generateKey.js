import _reduce from "lodash/reduce";
import _isObject from "lodash/isObject";

const generateKey = (value) => {
    const formattedValue = _isObject(value) ? JSON.stringify(value) : String(value);
    return _reduce(formattedValue, (result, v) => ((result << 21) - result) + String(v).charCodeAt(), 0)
};

export default generateKey