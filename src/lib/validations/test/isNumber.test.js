import chai from 'chai';
import isNumber from "../validation/isNumber";

const expect = chai.expect;

describe('isNumber tests', function () {
    it(`"asdasdasdasdasdasdasdasdasdasd" should return "Must be a number"`, function () {
        expect(isNumber('asdasdasdasdasdasdasdasdasdasd')).to.equal('Must be a number');
    });
    
    it(`"8080" should return false`, function () {
        expect(isNumber('8080')).to.equal(false);
    });
    
    it(`"34.56" should return false`, function () {
        expect(isNumber('34.56')).to.equal(false);
    });
    
    it(`"34,56" should return false`, function () {
        expect(isNumber('34,56')).to.equal(false);
    });
    
    it(`34,56 should return false`, function () {
        expect(isNumber(34,56)).to.equal(false);
    });
    
    it(`"34.56.56" should return "Must be a number"`, function () {
        expect(isNumber('34.56.56')).to.equal("Must be a number");
    });
    
    it(`"-34" should support negative values`, function () {
        expect(isNumber('-34')).to.equal(false);
    });
    
    it(`-34 should support negative values`, function () {
        expect(isNumber(-34)).to.equal(false);
    });
    
    it(`-34.56 should support negative values`, function () {
        expect(isNumber(-34.56)).to.equal(false);
    });
    
    it(`"34" should return false`, function () {
        expect(isNumber("34")).to.equal(false);
    });
    
    it(`"4" should return false`, function () {
        expect(isNumber("4")).to.equal(false);
    });
    
    it(`4 should return false`, function () {
        expect(isNumber(4)).to.equal(false);
    });
    
    it(`"89asdasdasdasd" should return "Must be a number"`, function () {
        expect(isNumber('89asdasdasdasd')).to.equal('Must be a number');
    });
    
    it(`"8080" asd as da" should return "Must be a number"`, function () {
        expect(isNumber('8080 asd as da')).to.equal('Must be a number');
    });
    
    it(`"e" should return "Must be a number"`, function () {
        expect(isNumber('e')).to.equal('Must be a number');
    });
});
