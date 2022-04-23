import getFieldValue from "./getFieldValue";

const hasError = (formik, field) => {
    const touched = getFieldValue(formik.touched, field);
    return touched && formik.errors[field];
};


export default hasError;
