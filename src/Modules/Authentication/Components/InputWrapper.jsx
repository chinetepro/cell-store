import React from 'react';

const InputWrapper = ({ className, helperText, intent, ...props }) => {
    const classInput = (className || "").concat(intent === 'danger' ? ' text-red-400 hover:border-red-400 focus:border-red-400 border-red-400 border-1' : '');
    return (
        <>
            <input className={classInput} {...props} />
            {helperText && <p className="text-red-500 text-xs">{helperText}</p>}
        </>
    );
};
export default InputWrapper;