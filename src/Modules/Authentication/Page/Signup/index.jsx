import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import validation, {
    isEmail,
    isName,
    isPassword,
    isRequired,
    confirmPassword,
} from '../../../../lib/validations/index';
import InputWrapper from '../../Components/InputWrapper';
import { useAuth } from '../../../../lib';
import InputEmail from '../../Components/InputEmail';
import InputPassword from '../../Components/InputPassword';
import { successToast } from '../../../../utils/toast';

const validate = validation({
    name: [isName, isRequired],
    email: [isEmail, isRequired],
    password: [isPassword, isRequired],
    confirm: [confirmPassword, isRequired],
});

function Signup({history}) {
    const { t } = useTranslation('common');
    const { register } = useAuth();

    const handleSubmit = async (values) => {
        try {
            const { confirm, rememberMe, ...formData } = values;
            await register({ rememberMe: rememberMe?.length > 0, ...formData });
            successToast(t('msgRegisterSucessfull'));
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    const formik = useFormik({
        initialValues: {},
        validate, // validations associate
        onSubmit: handleSubmit,
    });

    const disabledSave = !formik.isValid || !formik.dirty;
    const classNameButton =
        'bg-blue-500 text-white w-52 sm:w-auto font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors '.concat(
            disabledSave ? 'cursor-not-allowed bg-gray-300' : '',
        );

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <h1 className="font-bold text-xl text-center">Create your account</h1>

                <div className="flex flex-col space-y-1">
                    <InputWrapper
                        type="text"
                        name="name"
                        className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow "
                        placeholder="Username"
                        autoComplete="off"
                        onChange={formik.handleChange}
                        value={formik?.values?.name}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.name && t(formik.errors.name)}
                        intent={formik.touched.name && formik.errors.name ? 'danger' : 'none'}
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <InputEmail formik={formik} t={t} />
                </div>

                <div className="flex flex-col space-y-1">
                    <InputPassword formik={formik} t={t} />
                </div>

                <div className="flex flex-col space-y-1">
                    <InputPassword formik={formik} t={t} nameField={'confirm'} placeholder="Confirm Password" />                    
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <InputWrapper
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            onChange={formik.handleChange}
                            checked={formik?.values?.rememberMe?.length > 0}
                            onBlur={formik.handleBlur}
                            className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                        />
                        <label
                            htmlFor="rememberMe"
                            className="ml-2 block text-sm leading-5 text-gray-900"
                        >
                            {' '}
                            Remember me{' '}
                        </label>
                    </div>
                    <Link to={'/'}>
                        <span className="inline-block text-blue-500 hover:text-blue-800 hover:underline text-sm">
                            I already have an account.{' '}
                        </span>
                    </Link>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end items-center">
                    <button type="submit" className={classNameButton} disabled={disabledSave}>
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    );
}

export default memo(withRouter(Signup));
