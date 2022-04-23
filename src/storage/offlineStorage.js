import Dexie from 'dexie';
import * as Models from './models';

class OfflineStorage {
    constructor() {
        this.startCache();
    }

    restart() {
        this.clearCache(() => this.startCache());
    }

    get isService() {
        return true;
    }

    get Database() {
        return this.db;
    }

    clearCache(successCallback) {
        return this.db.delete().then(() => {
            console.log('Database successfully deleted');
            successCallback();
        }).catch(() => {
            console.error('Could not delete database');
        }).finally(() => {
            // Do what should be done next...
        });
    }

    startCache() {
        this.db = new Dexie('cache');
        const stores = {};
        Object.keys({...Models}).forEach(model => {
            Object.assign(stores, Models[model].schema);
        });
        this.db.version(1).stores(stores);
        this.db.open();
        return this.db;
    }

}

export default new OfflineStorage();