import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import tempState from '../../utils/tempState';
import {CarContext, useModuleContext, ModuleContext} from '../../Modules/Products/Contexts';
import MainNavbarPortal from './Components/MainNavbarPortal';
import { useTranslation } from 'react-i18next';
import { ServicePublicApiService } from '../../Modules/Products/services/ServicePublic.api.service';

export const cartItemsTemp = tempState('cart-items-state');

export const cartItemsConfigTemp = tempState('cart-items-config-state');

export const clearOffersTemp = () => {
    cartItemsTemp(null);
    cartItemsConfigTemp(null);
};

const MainLayout = ({ children }) => {
    const [carItems, setCarItems] = useState([]);
    
    const handleCarItems = useCallback((items) => {
        cartItemsTemp(items);
        setCarItems(items);
    }, []);
    
    useEffect(() => {
        const items = cartItemsTemp();
        items && handleCarItems(items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const [carItemsConfig, setCarItemsConfig] = useState([]);
    
    const handleCarItemsConfig = useCallback((items) => {
        cartItemsConfigTemp(items);
        setCarItemsConfig(items);
    }, []);
    
    useEffect(() => {
        const items = cartItemsConfigTemp();
        items && handleCarItemsConfig(items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const carData = useMemo(() => {
        const inCar = item => carItems.find(current => current.id === item.id);
        const addItem = item => {
            handleCarItems([item, ...carItems]);
        };
        
        const removeItem = item => {
            handleCarItems(carItems.filter(current => current.id !== item.id));
            handleCarItemsConfig(carItemsConfig.filter(({service}) => service !== item.id));
        };
        
        const changeConfig = event => {
            const {target: {value}} = event;
            handleCarItemsConfig(value);
        };
        
        return {
            addItem,
            carItemsConfig,
            changeConfig,
            removeItem,
            inCar,
            items: carItems,
        };
    }, [carItemsConfig, carItems, handleCarItems, handleCarItemsConfig]);
    const {t} = useTranslation('common');
    const service = useMemo(() => new ServicePublicApiService(), []);
    const {OfferListProvider, ...props} = useModuleContext(service);
    
    return (
        <ModuleContext.Provider value={{t, ...props}}>
            <OfferListProvider infinite={false}>
                <CarContext.Provider value={carData}>
                    <main>
                        <section className="bg-white">
                            <MainNavbarPortal />
                            {children}
                        </section>                
                    </main>
            </CarContext.Provider>
            </OfferListProvider>
        </ModuleContext.Provider>
    );

};

MainLayout.propTypes = {
    children: PropTypes.any
};

export default memo(MainLayout);

