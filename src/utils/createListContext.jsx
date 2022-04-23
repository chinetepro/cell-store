import React, {createContext, memo, useCallback, useContext, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {INFINITE_PER_PAGE, useInfinite} from './useInfinite';
import isEmpty from 'lodash/isEmpty';
import { getViewFromStorage, setViewFromStorage } from '../storage/helpers';

export const emptySelectedStatus = {allSelected: false, selectedCount: 0, selectedRows: []};

const INIT_PER_PAGE = 10;


const getArray = (data) => {
    data = data.data ? data.data : data;
    if (data?.elements) {
        return data.elements;
    } else if (data?.hits) {
        return data.hits;
    } else {
        return data;
    }
};

const getTotal = (data) => {
    data = data.data ? data.data : data;
    return data?.totalElements ? data.totalElements : data?.length;
};

const getService = (loadWithCache, loadWithSearch, isSearching, params, loadInfiniteWithCache, loadInfinite, isInfinite) => {
    if (isInfinite)
        return getInfiniteService(loadInfiniteWithCache, loadInfinite, isSearching, params);
    return getPaginationService(loadWithCache, loadWithSearch, isSearching, params);
};

const getPaginationService = (loadWithCache, loadWithSearch, isSearching, params) => {
    const payload = params.params ? params.params : params;
    if (isSearching) {
        loadWithSearch(payload);
    } else
        loadWithCache(payload);
};

const getInfiniteService = (loadWithCache, loadWithSearch, isSearching, params) => {
    const payload = params.params ? params.params : params;
    if (isSearching) {
        loadWithSearch(payload);
    } else
        loadWithCache(payload);
};


export const ActionTypes = {
    CHANGE_PARAMS: 'CHANGE_PARAMS',
    SEARCH: 'SEARCH',
    NOT_SEARCH: 'NOT_SEARCH'
};

export const initialState = {
    isSearching: false,
    params: {page: 0, size: INIT_PER_PAGE},
};

export function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.NOT_SEARCH:
            // delete state.params.search;
            // delete state.params.fields;
            // delete state.params.sortCriteria;
            state.params.page = 0;
            return {
                ...state,
                isSearching: false,
            };
        
        case ActionTypes.SEARCH:
            action.payload.page = 0;
            return {
                ...state,
                isSearching: true,
                params: action.payload,
            };
        
        case ActionTypes.CHANGE_PARAMS:
            return {
                ...state,
                params: action.payload,
            };
        
        default:
            return state;
    }
}


const isSearchingByParams = (params) => params.search || (params.fields && Object.keys(params.fields).length > 0) || params.sortCriteria;
const getHookData = (isSearching, isInfinite, cachePagRequest, searchPagRequest, cacheInfRequest, infRequest) => {
    if (isInfinite)
        return _getHookData(isSearching, cacheInfRequest, infRequest);
    return _getHookData(isSearching, cachePagRequest, searchPagRequest);
};
const _getHookData = (isSearching, cachRequest, searchRequest) => {
    const request = isSearching ? searchRequest : cachRequest;
    return {
        isLoading: request.isLoading,
        data: getArray(request.data),
        totalElements: getTotal(request.data),
        error: request.error,
        isEmpty: !request.isLoading && !getArray(request.data)?.length,
    };
};

export const usePaginationAndFilter = (useFindCache, useSearch, infinite, serviceExtraParams = {}) => {
    // eslint-disable-next-line no-unused-vars
    const [initialLoad, setInitialLoad] = useState(true);
    const [state, dispatch] = useReducer(reducer, {
        isSearching: false,
        params: {page: 0, size: INIT_PER_PAGE},
    });
    const paramsWithExtra = { ...state.params, ...serviceExtraParams };
    useEffect(() => {
        setInitialLoad(prevState => {
            if (prevState)
                return false;
            dispatch({type: ActionTypes.NOT_SEARCH});
            getService(loadWithCache, loadWithSearch, !isEmpty(serviceExtraParams), paramsWithExtra, loadInfiniteCache, loadWithSearch, infinite);
            return false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infinite]);
    
    const cacheRequest = useFindCache({
        ...{page: 0, size: infinite ? INFINITE_PER_PAGE : INIT_PER_PAGE},
        ...serviceExtraParams,
    });
    
    const {reload: loadWithCache, updateCache} = cacheRequest;
    
    const infiniteRequest = useInfinite(infinite, cacheRequest);
    const {reload: loadInfiniteCache} = infiniteRequest;
    
    const searchPagRequest = useSearch();
    const {performRequest: loadWithSearch} = searchPagRequest;
    
    const reload = useCallback((userParams = null) => {
        const params = !userParams ? paramsWithExtra : {...paramsWithExtra, ...userParams.params};
        getService(loadWithCache, loadWithSearch, isSearchingByParams(params), params, loadInfiniteCache, loadWithSearch, infinite);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithCache, loadWithSearch, loadInfiniteCache, state.isSearching]);
    
    const handlePerRowsChange = useCallback((newPerPage) => {
        if (infinite) return;
        const params = paramsWithExtra;
        params.size = newPerPage;
        getService(loadWithCache, loadWithSearch, isSearchingByParams(paramsWithExtra), params);
        dispatch({type: ActionTypes.CHANGE_PARAMS, payload: params});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithCache, loadWithSearch, infinite]);
    
    const handleSortChange = useCallback((sort) => {
        const params = paramsWithExtra;
        // eslint-disable-next-line
        if (params.sortCriteria == sort) return; // please not change == by === here is important to use it
        params.sortCriteria = sort;
        getService(loadWithCache, loadWithSearch, isSearchingByParams(params), params, loadInfiniteCache, loadWithSearch, infinite);
        if (isSearchingByParams(paramsWithExtra))
            dispatch({type: ActionTypes.SEARCH, payload: params});
        else
            dispatch({type: ActionTypes.NOT_SEARCH, payload: params});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithCache, loadWithSearch, loadInfiniteCache]);
    
    
    const handlePageChange = useCallback((page) => {
        if (infinite) return;
        const params = paramsWithExtra;
        params.page = page - 1;
        getService(loadWithCache, loadWithSearch, isSearchingByParams(paramsWithExtra), params);
        dispatch({type: ActionTypes.CHANGE_PARAMS, payload: params});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithCache, loadWithSearch, infinite]);
    
    //@deprecated isSearching , it must be removed
    const handleSearch = useCallback((search, isSearching, fields, clearFields) => {
        const params = paramsWithExtra;
        if (isSearching) {
            if (search)
                params.search = search;
            if (fields)
                params.fields = fields;
            if (clearFields)
                delete params.fields;    
            if (!isSearchingByParams(params))
                dispatch({type: ActionTypes.NOT_SEARCH});
            else {
                loadWithSearch(params);
                dispatch({type: ActionTypes.SEARCH, payload: params});
            }
        } else {
            if(params?.search){
                delete params.search;
            }
            dispatch({type: ActionTypes.NOT_SEARCH});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithSearch]);
    
    const setParams = useCallback((params) => {
        dispatch({type: ActionTypes.CHANGE_PARAMS, payload: params});
    }, []);
    
    // isSearching, isInfinite, cachePagRequest, searchPagRequest, cacheInfRequest, infRequest
    const result = getHookData(state.isSearching, infinite, cacheRequest, searchPagRequest, infiniteRequest, searchPagRequest);
    
    return {
        reload,
        handlePerRowsChange,
        handlePageChange,
        handleSortChange,
        handleSearch,
        setParams,
        state,
        updateCache,
        loadMore: infiniteRequest.loadMore,
        loadingPage: infiniteRequest.loadingPage,
        hasMore: infiniteRequest.hasMore,
        isSearching: state.isSearching,
        ...result,
        isEmpty: result.isEmpty && paramsWithExtra.page === 0,
    };
};

export const usePaginationAndFilterWithOutCache = (useFindCache, useSearch, infinite, serviceExtraParams = {}) => {
    // eslint-disable-next-line no-unused-vars
    const [initialLoad, setInitialLoad] = useState(infinite);
    const [state, dispatch] = useReducer(reducer, {
        isSearching: false,
        params: {page: 0, size: INIT_PER_PAGE},
    });
    const paramsWithExtra = { ...state.params, ...serviceExtraParams };
    useEffect(() => {
        setInitialLoad(prevState => {
            if (prevState)
                return false;
            dispatch({type: ActionTypes.NOT_SEARCH});
            getService(loadWithSearch, loadWithSearch, !isEmpty(serviceExtraParams), paramsWithExtra, loadInfiniteCache, loadInfiniteCache, infinite);
            return false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infinite]);
    
    const searchPagRequest = useSearch();
    const {performRequest: loadWithSearch} = searchPagRequest;

    const cacheRequest = useFindCache({
        ...{page: 0, size: infinite ? INFINITE_PER_PAGE : INIT_PER_PAGE},
        ...serviceExtraParams,
    });
    
    const infiniteRequest = useInfinite(infinite, cacheRequest, {
        ...{page: 0, size: infinite ? INFINITE_PER_PAGE : INIT_PER_PAGE},
        ...serviceExtraParams,
    });
    const {reload: loadInfiniteCache} = infiniteRequest;
    
    const reload = useCallback((userParams = null) => {
        const params = !userParams ? paramsWithExtra : {...paramsWithExtra, ...userParams.params};
        getService(loadWithSearch, loadWithSearch, isSearchingByParams(params), params, loadInfiniteCache, loadInfiniteCache, infinite);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithSearch, state.isSearching]);
    
    const handlePerRowsChange = useCallback((newPerPage) => {
        if (infinite) return;
        const params = paramsWithExtra;
        params.size = newPerPage;
        getService(loadWithSearch, loadWithSearch, isSearchingByParams(paramsWithExtra), params);
        dispatch({type: ActionTypes.CHANGE_PARAMS, payload: params});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithSearch, infinite]);
    
    const handleSortChange = useCallback((sort) => {
        const params = paramsWithExtra;
        // eslint-disable-next-line
        if (params.sortCriteria == sort) return; // please not change == by === here is important to use it
        params.sortCriteria = sort;
        getService(loadWithSearch, loadWithSearch, isSearchingByParams(params), params, loadInfiniteCache, loadInfiniteCache, infinite);
        if (isSearchingByParams(paramsWithExtra))
            dispatch({type: ActionTypes.SEARCH, payload: params});
        else
            dispatch({type: ActionTypes.NOT_SEARCH, payload: params});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithSearch]);
    
    
    const handlePageChange = useCallback((page) => {
        if (infinite) return;
        const params = paramsWithExtra;
        params.page = page - 1;
        getService(loadWithSearch, loadWithSearch, isSearchingByParams(paramsWithExtra), params);
        dispatch({type: ActionTypes.CHANGE_PARAMS, payload: params});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithSearch, infinite]);
    
    //@deprecated isSearching , it must be removed
    const handleSearch = useCallback((search, isSearching, fields, clearFields) => {
        const params = paramsWithExtra;
        if (isSearching) {
            if (search)
                params.search = search;
            if (fields)
                params.fields = fields;
            if (clearFields)
                delete params.fields;
            if (!isSearchingByParams(params))
                dispatch({type: ActionTypes.NOT_SEARCH});
            else {
                loadWithSearch(params);
                dispatch({type: ActionTypes.SEARCH, payload: params});
            }
        } else {
            if(params?.search){
                delete params.search;
            }
            dispatch({type: ActionTypes.NOT_SEARCH});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadWithSearch]);
    
    const setParams = useCallback((params) => {
        dispatch({type: ActionTypes.CHANGE_PARAMS, payload: params});
    }, []);
    
    // isSearching, isInfinite, cachePagRequest, searchPagRequest, cacheInfRequest, infRequest
    const result = getHookData(state.isSearching, infinite, searchPagRequest, searchPagRequest, infiniteRequest, searchPagRequest);
    
    return {
        reload,
        handlePerRowsChange,
        handlePageChange,
        handleSortChange,
        handleSearch,
        setParams,
        state,
        loadMore: infiniteRequest.loadMore,
        loadingPage: infiniteRequest.loadingPage,
        hasMore: infiniteRequest.hasMore,
        isSearching: state.isSearching,
        ...result,
        isEmpty: result.isEmpty && paramsWithExtra.page === 0,
    };
};


export const createListContext = (useFindCache, useSearch, translate, viewTypesName, viewTypes) => {
    const ListContext = createContext();
    
    function Provider({children, serviceExtraParams, infinite, ...props}) {
        const {t} = useTranslation(translate);
        
        const result = usePaginationAndFilter(useFindCache, useSearch, infinite, serviceExtraParams || {});
        
        const [selectedStatus, setSelectedStatus] = useState(emptySelectedStatus);
        
        const [view, setView] = useState(getViewFromStorage(viewTypesName) || viewTypes[0]);
        
        const handlerChangeView = useCallback((view) => {
            setView(view);
            setViewFromStorage(viewTypesName, view);
        }, []);
        
        return (
            <ListContext.Provider value={{
                t,
                view,
                ...result,
                handlerChangeView,
                VIEW: viewTypes,
                selectedStatus,
                setSelectedStatus,
                options: props
            }}>
                {children}
            </ListContext.Provider>
        );
    }
    
    function useList() {
        const context = useContext(ListContext);
        if (context === undefined) {
            throw new Error('must be used within a ListProvider');
        }
        const {
            t,
            view,
            handlerChangeView,
            VIEW,
            handleSearch,
            handlePageChange,
            handlePerRowsChange,
            handleSortChange,
            isSearching,
            isEmpty,
            data,
            totalElements,
            isLoading,
            reload,
            updateCache,
            error,
            selectedStatus,
            setSelectedStatus,
            setParams,
            loadMore,
            loadingPage,
            hasMore,
            state,
            options
        } = context;
        
        return {
            t,
            view,
            handlerChangeView,
            VIEW,
            handleSearch,
            handlePageChange,
            handlePerRowsChange,
            handleSortChange,
            isSearching,
            isEmpty,
            data,
            totalElements,
            isLoading,
            reload,
            updateCache,
            error,
            selectedStatus,
            setSelectedStatus,
            setParams,
            loadMore,
            loadingPage,
            hasMore,
            state,
            options
        };
    }
    
    Provider.propTypes = {
        infinite: PropTypes.bool,
        serviceExtraParams: PropTypes.any,
        children: PropTypes.any
    };
    
    return {Provider: memo(Provider), useList};
    
};


export const createListContextWithOutCache = (useFindCache, useSearch, translate, viewTypesName, viewTypes) => {
    const ListContext = createContext();
    
    function Provider({children, serviceExtraParams, infinite, ...props}) {
        const {t} = useTranslation(translate);
        
        const result = usePaginationAndFilterWithOutCache(useFindCache, useSearch, infinite, serviceExtraParams || {});
        
        const [selectedStatus, setSelectedStatus] = useState(emptySelectedStatus);
        
        const [view, setView] = useState(getViewFromStorage(viewTypesName) || viewTypes[0]);
        
        const handlerChangeView = useCallback((view) => {
            setView(view);
            setViewFromStorage(viewTypesName, view);
        }, []);
        
        return (
            <ListContext.Provider value={{
                t,
                view,
                ...result,
                handlerChangeView,
                VIEW: viewTypes,
                selectedStatus,
                setSelectedStatus,
                options: props
            }}>
                {children}
            </ListContext.Provider>
        );
    }
    
    function useList() {
        const context = useContext(ListContext);
        if (context === undefined) {
            throw new Error('must be used within a ListProvider');
        }
        const {
            t,
            view,
            handlerChangeView,
            VIEW,
            handleSearch,
            handlePageChange,
            handlePerRowsChange,
            handleSortChange,
            isSearching,
            isEmpty,
            data,
            totalElements,
            isLoading,
            reload,
            updateCache,
            error,
            selectedStatus,
            setSelectedStatus,
            setParams,
            loadMore,
            loadingPage,
            hasMore,
            state,
            options
        } = context;
        
        return {
            t,
            view,
            handlerChangeView,
            VIEW,
            handleSearch,
            handlePageChange,
            handlePerRowsChange,
            handleSortChange,
            isSearching,
            isEmpty,
            data,
            totalElements,
            isLoading,
            reload,
            updateCache,
            error,
            selectedStatus,
            setSelectedStatus,
            setParams,
            loadMore,
            loadingPage,
            hasMore,
            state,
            options
        };
    }
    
    Provider.propTypes = {
        infinite: PropTypes.bool,
        serviceExtraParams: PropTypes.any,
        children: PropTypes.any
    };
    
    return {Provider: memo(Provider), useList};
    
};