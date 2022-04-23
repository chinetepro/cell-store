class EndPointCache {

    constructor(entity, db) {
        this.entity = entity;
        this.db = db;
    }

    getTable() {
        return this.getDatabase()[this.entity];
    }

    getDatabase(){
        return this.db.isService ? this.db.Database : this.db;
    }

    insertMany(data) {
        return this.getTable().bulkPut(data);
    }

    insert(data) {
        return this.getTable().add(data);
    }


    cacheListResponse(path, filter, results, additionalFields) {
        return this.getDatabase().transaction('rw', this.getTable(), async () => {
            const request = {
                path
            };

            const moreFields = additionalFields || {};

            if (results instanceof Array) {
                const bulk = results.map((item, index) => this.mapObject(item, request, index, moreFields));
                return this.insertMany(bulk);
            }
            return this.insert(this.mapObject(results, request, 0, moreFields));
        })
    }

    mapObject(object, __request__, order, moreFields) {
        return Object.assign({}, object, {__request__: {...__request__, order}}, moreFields);
    }

    _getByPath(path, params) {
        return this.getTable().where('__request__.path').equals(path);
    }

    getByPath(path, params) {
        return this.getDatabase().transaction('r', this.getTable(), async () => {
            return this._getByPath(path, params).sortBy('__request__.order');
        });

    }

    updateByPath(path, data) {
        return this._getByPath(path).modify(data);
    }

    removeByPath(path) {
        return this.getDatabase().transaction('rw', this.getTable(), async () => {
            return this._getByPath(path).delete();
        });
    }
}


export default EndPointCache;