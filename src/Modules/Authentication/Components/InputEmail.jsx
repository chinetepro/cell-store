import React from 'react';
import InputWrapper from './InputWrapper';

const InputEmail = ({ formik, t, nameField = "email", placeholder , ...props }) => {
    return (
        <InputWrapper
            type="email"
            name={nameField}
            className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
            placeholder={placeholder || "Email"}
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik?.values[nameField]}
            onBlur={formik.handleBlur}
            helperText={formik.touched[nameField] && t(formik.errors[nameField])}
            intent={formik.touched[nameField] && formik.errors[nameField] ? 'danger' : 'none'}
            {...props}
        />
    );
};
export default InputEmail;