import {useCallback, useEffect, useMemo, useReducer} from 'react';

export const ActionTypes = {
    REQUEST_INIT: 'REQUEST_INIT',
    REQUEST_SUCCESS: 'REQUEST_SUCCESS',
    REQUEST_FAILURE: 'REQUEST_FAILURE',
};

export const initialState = {
    data: null,
    error: null,
    isLoading: false,
};

export function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.REQUEST_INIT:
            return {
                ...state,
                error: null,
                isLoading: true,
            };

        case ActionTypes.REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        case ActionTypes.REQUEST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
                isLoading: false,
            };
        default:
            return state;
    }
}

export function createCacheHook(reactiveRequest, initialData) {

    return function () {
        const [state, dispatch] = useReducer(reducer, {
            data: initialData,
            error: null,
            isLoading: false,
        });
        const initialLoading = arguments;
        // const [cache, setOptionCache] = useReducer(reducer, inital);
        const {subscribe, reload, updateCache, cleanAndReload} = useMemo(() => {
            const request = reactiveRequest();
            request.subscribe({
                next: (data) => {
                    if (data && data.__event__ === 'error')
                        dispatch({type: ActionTypes.REQUEST_FAILURE, payload: data.error});
                    else
                        dispatch({type: ActionTypes.REQUEST_SUCCESS, payload: data});
                },
                error: (error) => {
                    dispatch({type: ActionTypes.REQUEST_FAILURE, payload: error});
                }
            });
            if (initialLoading && initialLoading.length && initialLoading[0]) {
                dispatch({type: ActionTypes.REQUEST_INIT});
                request.reload(...initialLoading);
            }

            function cleanAndReload() {
                const initialLoading = arguments;
                dispatch({type: ActionTypes.REQUEST_INIT});
                request.reload(...initialLoading);
            }

            return {...request, cleanAndReload};
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return {
            data: state.data,
            error: state.error,
            isLoading: state.isLoading,
            subscribe,
            reload,
            cleanAndReload,
            updateCache
        };
    }
}


export function createHook(request, initialData) {

    return (preloadParams) => {

        const [state, dispatch] = useReducer(reducer, {
            data: initialData,
            error: null,
            isLoading: false,
        });

        const performRequest = useCallback(function () {
            dispatch({type: ActionTypes.REQUEST_INIT});
            try {
                const promise = request(...arguments);
                promise.then(response => {
                    dispatch({type: ActionTypes.REQUEST_SUCCESS, payload: response.data});
                }).catch((error => dispatch({type: ActionTypes.REQUEST_FAILURE, payload: error})));
                return promise;
            } catch (error) {
                dispatch({type: ActionTypes.REQUEST_FAILURE, payload: error});
                return Promise.reject(error)
            }
        }, []);

        useEffect(() => {
            if (preloadParams) {
                performRequest(preloadParams);
            }
        }, [performRequest, preloadParams]);

        return {
            data: state.data,
            error: state.error,
            isLoading: state.isLoading,
            performRequest
        };
    }
}

