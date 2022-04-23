import React, { memo, useMemo } from 'react';
import { useModuleContext, ModuleContext } from '../Contexts';
import { ServiceListContainer } from '../Containers';
import { SUBROUTES } from '../constants/routes.constant';
import {useResponsive} from 'd-components-core';
import { useTranslation } from 'react-i18next';
import ServiceApiService from '../services/Service.api.service';

const Services = () => {
    const { isDesktop } = useResponsive();
    const service = useMemo(() => ServiceApiService, []);
    const { ServiceListProvider, ...props } = useModuleContext(service);
    const { t } = useTranslation('service');
    return (
        <ModuleContext.Provider value={{ t, ...props }}>
            <ServiceListProvider infinite={!isDesktop}>                
                <ServiceListContainer/>
                <RouterLoader routes={SUBROUTES}/>
            </ServiceListProvider>
        </ModuleContext.Provider>
    );
};

export default memo(Services);
