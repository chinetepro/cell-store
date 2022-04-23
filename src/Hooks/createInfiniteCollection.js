import {useMemo, useState, useEffect, useCallback} from 'react';
import { createHook } from '../lib/api';


export default (request, size=10) => {
    const useRequest = createHook(request);
    
    
    return (params) => {
        const [args, setArgs] = useState({
            page: 1,
            size: -1,
            totalElements: 0,
            totalPages: 0,
            elements: []
        });

        const [currentParams, setCurrentParams] = useState({size: size});
        
        const {data, error, isLoading, performRequest} = useRequest();
        
        useEffect(() => {
            const _params = {...currentParams, ...params};
            performRequest(_params);
            setCurrentParams(_params);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        
        const hasNext = useMemo(() => args?.page < args?.totalPages, [args]);
        
        const collection = useMemo(() => {
            const {
                page,
                size,
                totalElements,
                totalPages,
                elements
            } = data || args;
            
            setArgs({
                page,
                size,
                totalElements,
                totalPages,
            });
            
            return elements || [];
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [data]);
        
        const fetchMore = useCallback(() => {
            if (hasNext) {
                const page = (args?.page || 0) + 1;
                const _params = {...currentParams, page};
                setCurrentParams(_params);
                performRequest(_params);
            }
        }, [args, currentParams, hasNext, performRequest]);
        
        return {
            collection,
            data,
            error,
            isLoading,
            fetchMore
        };
    };
};
