import React from 'react';
import InputWrapper from './InputWrapper';

const InputPassword = ({ formik, t, nameField = "password", placeholder,  ...props }) => {
    return (
        <InputWrapper
            type="password"
            name={nameField}
            className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
            placeholder={placeholder || "Password"}
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
export default InputPassword;