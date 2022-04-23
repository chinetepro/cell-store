import { createContext, useMemo } from 'react';
import { createCacheHook, createHook } from '../../../lib';
import { createListContext } from '../../../utils/createListContext';
export const ModuleContext = createContext();

export const DEFAULT_VIEWS = [
    {title: 'table', icon: 'th'},
    {title: 'list', icon: 'properties'}
];

export const useModuleContext = (service) => {
    const useFindOfferCache = createCacheHook(service.getOneCache);
    const useAddToCart = createHook(service.addToCart,{});
    
    const listContext = useMemo(() => {
        const useFindAllOffer = createHook(service.getAllPost, []);
        const useFindOfferWithCache = createCacheHook(service.getAllCache, []);
        return createListContext(useFindOfferWithCache, useFindAllOffer, 'offer', '__OfferS_VIEW__', DEFAULT_VIEWS);
    }, [service]);

    return {
        service,
        OfferListProvider: listContext.Provider,
        useOfferList: listContext.useList,
        useFindOfferCache,
        useAddToCart,
    };
};