import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import validation, {
    isEmail,
    isPassword,
    isRequired,
} from '../../../../lib/validations/index';
import { useAuth } from '../../../../lib';
import InputEmail from '../../Components/InputEmail';
import InputPassword from '../../Components/InputPassword';
import { successToast } from '../../../../utils/toast';

const validate = validation({
    email: [isEmail, isRequired],
    password: [isPassword, isRequired]
});

function LoginForm() {
    const { t } = useTranslation('common');
    const { login } = useAuth();

    const handleSubmit = async (values) => {
        try {
            const {rememberMe, ...formData } = values;
            await login({ rememberMe: rememberMe?.length > 0, ...formData });
            successToast(t('msgLoginSucessfull'))
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
        'bg-blue-500 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors '.concat(
            disabledSave ? 'cursor-not-allowed bg-gray-300' : '',
        );
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-6">
                <h1 className="font-bold text-xl text-center">Sign in to your account</h1>

                <div className="flex flex-col space-y-1">
                    <InputEmail formik={formik} t={t} />
                </div>

                <div className="flex flex-col space-y-1">
                    <InputPassword formik={formik} t={t} />
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center">
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            className="inline-block align-middle"
                        />
                        <label className="ml-2 inline-block align-middle text-sm" htmlFor="remember">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={classNameButton}
                        disabled={disabledSave}
                    >
                        Log In
                    </button>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-start items-center">
                    <Link to={'/signup'}>
                        <span className="text-sm inline-block text-blue-500 hover:text-blue-800 hover:underline">
                            Do you already have an account?{' '}
                        </span>
                    </Link>
                </div>

            </div>
        </form>
    );
}

export default memo(LoginForm);
