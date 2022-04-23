import hasError from "../helpers/hasError";

const INVALID_MSG = 'Invalid username or email';

const formik = {
    touched:{data:{type:true}, name:false},
    errors: {}
}

describe('hasError without errors', function () {

    it(`It should return false when there is not errors`, function () {
        expect(hasError(formik,'name')).toBe(false);
    });

    it(`It should return false when there is tocuhed but not error`, function () {
        formik.touched.name=true;
        expect(!!hasError(formik,'name')).toBe(false);
    });

});

describe('hasError with errors but not touched', function () {

    it(`It should return false when there is an error but is not touched`, function () {
        formik.errors.name=INVALID_MSG;
        formik.touched.name=false;
        expect(hasError(formik,'name')).toBe(false);
    });

    it(`It should return false when there is an error but is not touched`, function () {
        formik.errors.name=INVALID_MSG;
        formik.touched.name=true
        expect(hasError(formik,'name')).toBe(INVALID_MSG);
    });
});

describe('hasError with complex field path', function () {

    it(`It should return false when there is not errors`, function () {
        expect(!!hasError(formik,'data.type')).toBe(false);
    });

    it(`It should return false when there is tocuhed but not error`, function () {
        formik.errors['data.type']=INVALID_MSG;
        formik.touched.data={type:true};
        expect(hasError(formik,'data.type')).toBe(INVALID_MSG);
    });

});