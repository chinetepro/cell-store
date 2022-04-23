import React, { memo } from 'react';
import UnauthenticatedLayout from './Layouts/UnauthenticatedLayout';
import { RouterLoader } from './lib';
import publicRoutes from './publicRoutes';

const UnauthenticatedApp = () => {
    return (
        <UnauthenticatedLayout>
            <RouterLoader routes={publicRoutes} notfoundRedirect={'/'} />
        </UnauthenticatedLayout>
    );
};

export default memo(UnauthenticatedApp);
