import ApiClientService from '../../ApiClient';
import {Subject} from 'rxjs';

const pathValue = (generatePath, ...args) => typeof generatePath === 'function' ? generatePath(...args) : generatePath;

export const createReactiveRequestWithParams = (request, cache, initialValue, isMany, generatePath, withNetStatus, needToken) => {
    const subject = new Subject();
    return () => {
        let loaded = 0;
        let requestNumber = 0;

        let params = [];

        //to keep the old version compatibles
        function notify(data, network, headers = {}) {
            if (withNetStatus)
                return subject.next({data, __network__: network, headers});
            subject.next(data);
        }


        function reload() {
            requestNumber++;
            const currentRequest = requestNumber;
            return new Promise((resolve, reject) => {

                const token = ApiClientService.getToken();
                if (!token && needToken) return subject.next(initialValue);

                params = arguments;
                const path = pathValue(generatePath, ...params);
                const before = loaded;
                let successNetworkLoad = loaded;

                cache.getByPath(path, params).then(data => {
                    if (currentRequest === requestNumber && before >= successNetworkLoad && data && data.length) {
                        if (!isMany)
                            notify(data[0], false);
                        else
                            notify(data, false);
                    }
                }).catch(() => {
                    //ignoring error
                });

                request(...arguments).then(({data, headers}) => {
                    loaded++;
                    successNetworkLoad++;
                    if (currentRequest === requestNumber)
                        notify(data, true, headers);
                    cache.removeByPath(path).then(() => {
                        cache.cacheListResponse(path, {}, data);
                    }).catch(error => {
                        console.log(error);
                    });

                }).catch(error => {
                    loaded++;
                    subject.next({error, __event__: 'error'});
                });
            })
        };


        const getByCache = (first) => {
            const path = pathValue(generatePath, ...params);
            cache.getByPath(path, params).then(data => {
                if (((!first && loaded > 0) || (first && loaded === 0)) && data.length) {
                    if (!isMany && data && data.length)
                        notify(data[0], false);
                    else
                        notify(data, false);

                }
            });
        };

        const updateCache = (data) => {
            const token = ApiClientService.getToken();
            const path = pathValue(generatePath, ...params);
            if (token || !needToken) {
                if (isMany) {
                    cache.removeByPath(path).then(() => {
                        cache.cacheListResponse(path, params, data).then(() => {
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
            if (token || !needToken) {
                getByCache(true);
            }
            return subscription;
        };

        return {subscribe, reload, updateCache};
    };
};