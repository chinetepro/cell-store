import {ApiClientService, ApiServiceAbstract, EndPointCache} from '../../lib';
import {Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {User} from '../../storage/models';
import db from '../../storage/offlineStorage';
import {isFunction} from 'rxjs/internal-compatibility';

class UserApiService extends ApiServiceAbstract {

    constructor() {
        super('/ms-auth/api', '/users', new EndPointCache(User.collection, db));
        this.subject = new Subject();
        this.dataSubject = this.subject.pipe(filter((data) => !data?.__event__ || data?.__event__ !== 'error'));
        this.errorSubject = this.subject.pipe(filter((data) => data?.__event__ && data?.__event__ === 'error'), map(data => data.error));
    }

    /**
     * Find access requests
     * @return {{observable: Observable, reload: function}}
     * */
    me = () => {
        const path = `${this.path}/me`;
        let loaded = 0;
        let wasReload = false;


        const reload = () => {
            const token = ApiClientService.getToken();
            if (!token) return this.subject.next(null);

            ApiClientService.get(path).then(({data}) => {
                loaded++;
                this.subject.next({user: data});
                this.cache.removeByPath(path).then(() => {
                    this.cache.cacheListResponse(path, null, data);
                });
            }).catch(error => {
                loaded++;
                this.subject.next({error, __event__: 'error'});
            });
        };

        const getByCache = (first) => {
            this.cache.getByPath(path).then(data => {
                if (data.length && ((!first && loaded > 0) || (first && loaded === 0))) {
                    this.subject.next({user: data[0]});
                }
            });
        };

        const updateCache = (user) => {
            const token = ApiClientService.getToken();
            if (token) {
                this.cache.updateByPath(path, user).then(() => {
                    getByCache(0);
                });
            }
        };

        const subscribe = (observer) => {
            const subscriptions = [];
            // handling two format of observers; a simple callback or a object with "next" and "error" definition

            let nextCallback = observer;

            if (!isFunction(observer))
                nextCallback = observer.next;
            if (nextCallback)
                subscriptions.push(this.dataSubject.subscribe(nextCallback));  //subscribe to the steam data

            if (observer.error)   //if it has error callback, then add the subscription just for errors
                subscriptions.push(this.errorSubject.subscribe(observer.error));
            const token = ApiClientService.getToken();

            if (token) {
                getByCache(true);
            } else {
                nextCallback && nextCallback(null);
            }
            if (!wasReload) {
                reload();
                wasReload = true;
            }
            return {unsubscribe: () => subscriptions.forEach(sub => sub.unsubscribe())};
        };

        return {subscribe, reload, updateCache};
    };


    /**
     * Find access requests
     * @return {Promise}
     * */
    avatar = (payload, onUploadProgress) => {
        const path = `${this.path}/upload-avatar`;
        const headers = {
            // 'Content-Type': 'multipart/form-data',
        };
        try {
            let form = new FormData();
            if (payload) {
                Object.keys(payload).forEach(key => {
                    form.append(key, payload[key]);
                });
            }
            return ApiClientService.post(path, form, {headers, onUploadProgress});
        } catch (error) {
            return Promise.reject(error);
        }
    };

}

export default new UserApiService();
