import ApiClientService from '../../ApiClient';
import {Subject} from 'rxjs';

export * from './reactiveCacheWithParams';

// @deprecated
export const createReactiveRequest = (path, cache, isMany = true, additionalFields) => {
    const subject = new Subject();
    return (params) => { //todo with cache
        let loaded = 0;
        let requestNumber = 0;

        const reload = () => {
            requestNumber++;
            const currentRequest = requestNumber;
            const token = ApiClientService.getToken();
            if (!token) return subject.next(isMany ? [] : null);

            ApiClientService.get(path, params).then(({data}) => {
                loaded++;
                if (currentRequest === requestNumber)
                    subject.next(data);
                cache.removeByPath(path).then(() => {
                    cache.cacheListResponse(path, params, data, additionalFields);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                loaded++;
                subject.next({error, __event__: 'error'});
            });
        };


        const getByCache = (first) => {
            cache.getByPath(path, params).then(data => {
                if (((!first && loaded > 0) || (first && loaded === 0))) {
                    subject.next(data);
                }
            });
        };

        const updateCache = (data) => {
            const token = ApiClientService.getToken();
            if (token) {
                if (isMany) {
                    cache.removeByPath(path).then(() => {
                        cache.cacheListResponse(path, params, data, additionalFields).then(() => {
                            getByCache(0);
                        });
                    });
                } else
                    cache.updateByPath(path, data).then(() => {
                        getByCache(0);
                    });
            }
        };

        const subscribe = (observer) => {
            const subscription = subject.subscribe(observer);
            const token = ApiClientService.getToken();
            if (token) {
                getByCache(true);
            }
            return subscription;
        };

        // reload();

        return {subscribe, reload, updateCache};
    };
};