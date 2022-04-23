import React, { memo } from 'react';
import PropTypes from 'prop-types';

function UnauthenticatedLayout({ children }) {
    return (
        <div className="font-sans min-h-screen antialiased bg-gray-200 pt-24 pb-5">
            <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
                <h1 className="font-bold text-center text-4xl text-gray-500">
                    Cell<span className="text-blue-500">Store</span>
                </h1>
                {children}
                <div className="flex justify-center text-gray-500 text-sm">
                    <p>&copy;{new Date().getFullYear()}. All right reserved.</p>
                </div>
            </div>
        </div>
    )
}

UnauthenticatedLayout.propTypes = {
    children: PropTypes.any,
};

export default memo(UnauthenticatedLayout);
