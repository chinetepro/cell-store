import getFieldValue from "../helpers/getFieldValue";


const data = {
    key:{key2:{key3:true}},
    path:{path:true},
    init:true,
};

describe('getFieldValue with existing path', function () {

    it(`It should return the value with an existing path`, function () {
        expect(getFieldValue(data,'key.key2.key3')).toBe(true);
    });

    it(`It should return the value with an existing path`, function () {
        expect(getFieldValue(data,'path.path')).toBe(true);
    });

    it(`It should return the value with an existing path`, function () {
        expect(getFieldValue(data,'init')).toBe(true);
    });

});

describe('getFieldValue with not existing path', function () {

    it(`It should return the value with an existing path`, function () {
        expect(!!getFieldValue(data,'key.key2.key3.key4')).toBe(false);
    });

    it(`It should return the value with an existing path`, function () {
        expect(!!getFieldValue(data,'initnot')).toBe(false);
    });

});