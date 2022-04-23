import AppProviders from './context';
import ApiClientService from './services/ApiClient';
import ApiServiceAbstract from './services/ApiServiceAbstract';
import {createReactiveRequest, createReactiveRequestWithParams} from './services/utils/reactiveCache';
import {createCacheHook, createHook} from './services/utils/api';
import EndPointCache from './services/EndPointCache';
import {useUser} from './context/user-context'
import {useAuth} from './context/auth-context'
import RouterLoader from './Component/Router/loader'
import RouteWithProps from './Component/Router/RouteWithProps'
import {getViewFromStorage, searchByText, setViewFromStorage} from './services/utils/helpers'


export {
    AppProviders,
    ApiClientService,
    ApiServiceAbstract,
    createReactiveRequest,
    createReactiveRequestWithParams,
    createCacheHook,
    createHook,
    useUser,
    useAuth,
    RouterLoader,
    RouteWithProps,
    EndPointCache,
    setViewFromStorage,
    getViewFromStorage,
    searchByText
}
