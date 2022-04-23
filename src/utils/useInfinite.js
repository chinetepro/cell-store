import {useMemo, useReducer} from 'react';
import { useInfiniteScroll } from '../Hooks/useInfiniteScroll';

export const INFINITE_PER_PAGE = 35;

const loadingMock = [
    {id:'loading1', __loading__: true},
    {id:'loading2', __loading__: true},
    {id:'loading3', __loading__: true},
    {id:'loading4', __loading__: true},
];

export const ActionTypes = {
    PAGE_INIT: 'REQUEST_INIT',
    PAGE_LOAD: 'PAGE_LOAD',
    PAGE_LOAD_FINISH: 'PAGE_LOAD_FINISH',
    REQUEST_FAILURE: 'REQUEST_FAILURE',
    LOAD_MORE: 'LOAD_MORE',
};

export function reducer(state, action) {
    switch (action.type) {
        case ActionTypes.PAGE_INIT: {
            const params = state.params;
            params.page = 0;
            return {
                ...state,
                error: null,
                previous: [],
                data: [],
                params,
                hasMore: true,
                isLoading: true,
                loadingPage: true
            };
        }
        case ActionTypes.REQUEST_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                hasMore: false,
                loadingPage: false
            };

        case ActionTypes.PAGE_LOAD: {
            const data = [...state.previous, ...action.payload.array];
            return {
                ...state,
                data: data,
                hasMore: action.payload.array.length === state.params.size && data.length < action.payload.total,
                error: null,
                isLoading: false,
                loadingPage: false
            };
        }
        case ActionTypes.PAGE_LOAD_FINISH: {
            const data = [...state.previous, ...action.payload.array];
            return {
                ...state,
                data: data,
                previous: data,
                hasMore: action.payload.array.length === state.params.size && data.length < action.payload.total,
                error: null,
                isLoading: false,
                loadingPage: false
            };
        }

        case ActionTypes.LOAD_MORE: {
            const params = state.params;
            params.page = params.page + 1;
            const data = [...state.previous, ...loadingMock ];
            return {
                ...state,
                error: null,
                params,
                isLoading: false,
                loadingPage: true,
                data
            };
        }
        default:
            return state;
    }
}

export const useInfinite = (enable, request, params = {}, arrayField = 'elements', totalField = 'totalElements', totalHeader, countByPage = INFINITE_PER_PAGE) => {
    const [state, dispatch] = useReducer(reducer, {
        data: [],
        previous: [],
        params: {page: 0, size: countByPage, ...params},
        error: null,
        hasMore: true,
        isLoading: false,
        loadingPage: false
    });
        // const [cache, setOptionCache] = useReducer(reducer, inital);
    const {subscribe, reload, updateCache, loadMore} = useMemo(() => {
        dispatch({type: ActionTypes.PAGE_INIT});
        let loadingPage = false;
        request?.subscribe && request.subscribe({
            next: (data) => {
                if (data && data.__event__ === 'error')
                    dispatch({type: ActionTypes.REQUEST_FAILURE, payload: data.error});
                else {
                    const array = (arrayField ? data.data[arrayField] : data.data) || [];
                    loadingPage = !data.__network__;
  
                    let total = totalField ? data.data[totalField] : data.headers[totalHeader];
                    dispatch({
                        type: data.__network__ ? ActionTypes.PAGE_LOAD_FINISH : ActionTypes.PAGE_LOAD,
                        payload: {array, total}
                    });
                }
            },
            error: (error) => {
                dispatch({type: ActionTypes.REQUEST_FAILURE, payload: error});
            }
        });

        function reload() {
            dispatch({type: ActionTypes.PAGE_INIT});
            request.reload({...state.params, page: 0});
        }

        function loadMore() {
            console.log('loadingPage', loadingPage, state.params);
            if (loadingPage) return;
            loadingPage = true;
            request.reload({...state.params, page: state.params.page + 1});
            dispatch({type: ActionTypes.LOAD_MORE});
        }

        return {
            ...request, reload, loadMore
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useInfiniteScroll(enable && !state.isLoading && !state.loadingPage && state.hasMore, loadMore);

    return {
        loadingPage: state.loadingPage,
        hasMore: state.hasMore,
        data: state.data,
        error: state.error,
        isLoading: state.isLoading,
        subscribe,
        loadMore,
        reload,
        updateCache
    };
}
;

