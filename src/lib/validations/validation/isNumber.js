const isNumber = value => {
    const number = Number.parseFloat(value);
    const isNumber = Number.isNaN(number);
    const isNumberRegex = /(^-?(\d*)([.,]?\d+))$/i.test(value);
    if (isNumber || !isNumberRegex) {
        return 'Must be a number';
    }
    return false;
};

export default isNumber;
