import ApiClientService from './ApiClient';
import {createReactiveRequest, createReactiveRequestWithParams} from './utils/reactiveCache';

class APiService {
    constructor(prefix, path, cache) {
        this.prefix = prefix;
        this.path = `${prefix}${path}`; // /msauth/api/spaces
        this.cache = cache;
    }

    _getPath(params){
        return this.path;
    }

    getAll = (params) => {
        return ApiClientService.get(this._getPath(params), params);
    };

    getAllCache = (params) => {
        return createReactiveRequest(this._getPath(params), this.cache, true)(params);
    };

    getOne = (id, params, config) => {
        return ApiClientService.get(`${this._getPath(params)}/${id}`, params, config);
    };

    getOneCache = () => {
        return createReactiveRequestWithParams(this.getOne, this.cache, null, false, (id, params) => `${this._getPath(params)}/${id}`)();
    };

    save = (params, config) => {
        return ApiClientService.post(this._getPath(params), params, config);
    };

    updateItem = (id, params, config) => {
        return ApiClientService.put(`${this._getPath(params)}/${id}`, params, config);
    };

    /**
     * @deprecated
     */
    update = (params, config) => {
        return ApiClientService.put(this._getPath(params), params, config);
    };

    partialUpdate = (id, params, config) => {
        return ApiClientService.patch(`${this._getPath(params)}/${id}`, params, config);
    }

    deleteOne = (id, params, config) => {
        return ApiClientService.delete(`${this._getPath(params)}/${id}`, params, config);
    };
}

export default APiService;