import isPhoneNumber from "../validation/isPhoneNumber";
import chai from "chai";

const expect = chai.expect;

const testOK = [
    '5356083221',
    '+5356083221',
    '53 5608 32 21',
    '(800) 555-0100',
    '+1-202-555-0183',
    '+1-202-555-0120',
    '+1-202-555-0127',
    '+1-202-555-0153',
    '+1-202-555-0134',
    '+1-202-555-0164',
    '+14155552671',
    '+442071838750',
    '56083221',
];

const testWrong = [
    '(202)-555-0153',
    '(415) 555-2671',
    '202-555-0127+',
    '-202-555-0127',
    '07700900461',
    '2+02-555-0127',
    '202-555-0164q',
    '384(8570)987-34-43',
    '535(6474)858-93-17',
    '962(7a366)906-39-17',
    '84(6894)737-90-58',
    '864(20)119-50-12',
    '202-555-0164',
    '96(544)913-70-42a',
    '106(287)095-59-77',
    '64(19)187-45-88',
    'c808(612)722-37-20',
    '87(9994)715-39-41',
    'lorem ipsum dolor',
    'asdasdasdasd',
    '12345',
    '020 7183 8750',
];

describe('isPhoneNumber tests', function () {
    describe('Phone Number must be valid', function () {
        testOK.forEach((element) => {
            it(element, function () {
                expect(isPhoneNumber(element)).to.equal(false);
            });
        })
    });
    
    describe('Phone Number be in valid', function () {
        testWrong.forEach((element) => {
            it(element, function () {
                expect(isPhoneNumber(element)).to.equal('Must be a valid phone number.');
            });
        })
    });
});
