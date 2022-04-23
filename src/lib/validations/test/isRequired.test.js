import isRequired from "../validation/isRequired";
import chai from "chai";

const expect = chai.expect;

const testOK = [
    {
        value: 'value a',
        result: false
    },
    {
        value: ['value a', 'value b'],
        result: false
    },
];

const testWrong = [
    {value: '', result: 'Required'},
    {value: undefined, result: 'Required'},
    {
        value: [],
        result: 'Required'
    },
];

describe('isRequired tests', function () {
    describe('must be valid', function () {
        testOK.forEach((element) => {
            it(`${element.value} should return "${element.result}"`, function () {
                expect(isRequired(element.value)).to.equal(false);
            });
        })
    });
    
    describe('must be inValid', function () {
        testWrong.forEach((element) => {
            it(`${element.value} should return "${element.result}"`, function () {
                expect(isRequired(element.value)).to.equal('Required');
            });
        })
    });
});
