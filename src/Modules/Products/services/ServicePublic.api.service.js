import {
    ApiServiceAbstract,
    ApiClientService,
    EndPointCache,
    createReactiveRequestWithParams,
} from '../../../lib';
import { Offer } from '../../../storage/models';
import db from '../../../storage/offlineStorage';
import { LANG_PARAMS } from '../../../constants/utils';
import CacheRequestPromise from '../../../lib/CacheRequestPromise';

export class ServicePublicApiService extends ApiServiceAbstract {
    constructor(fieldSearch) {
        super('/api', '/product', new EndPointCache(Offer.collection, db));
        this.fieldSearch = fieldSearch || {};
    }

    getOne = (id, params, config) => {
        return CacheRequestPromise(
            (...args) => ApiClientService.get(...args),
            `${this.path}/${id}`,
            't',
        ).then((r) => r);
    };

    getOneCache = () => {
        return createReactiveRequestWithParams(
            this.getOne,
            this.cache,
            null,
            false,
            (id, params) => `${this.path}/${id}?lang=${params?.lang}`,
        )();
    };

    addToCart = (params) => {
        return ApiClientService.post(`${this.prefix}/cart`, params);
    };
    

    getAllPost = (params) => {
        return CacheRequestPromise(
            (...args) => ApiClientService.get(...args),
            `${this.path}?${LANG_PARAMS}`,
            't',
        ).then((r) => {
            // Because the endpoint dont filter by these criterias.
            const { data } = r;
            return {
                data: !!params?.search
                    ? data.filter(
                          ({ brand, model, price }) =>
                              brand.toLowerCase().includes(params?.search.toLowerCase()) ||
                              model.toLowerCase().includes(params?.search.toLowerCase()) ||
                              price.toLowerCase().includes(params?.search.toLowerCase()),
                      )
                    : data,
            };
        });
    };

    getAllCache = () => {
        return createReactiveRequestWithParams(
            this.getAllPost,
            this.cache,
            null,
            false,
            (options) =>
                `${this.path}?page=${options?.params?.page}&size=${options?.params?.size}&${LANG_PARAMS}`,
            true,
        )();
    };
}

export default new ServicePublicApiService();
