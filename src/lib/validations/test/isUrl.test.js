import isUrl from "../validation/isUrl";
import chai from "chai";

const expect = chai.expect;

const testUrlsOK = [
    {
        url: 'https://xd.adobe.com/view/59850e34-b4ef-4b9b-460e-67ab93ae551a-2fb4/screen/7ed4e23e-d6c8-4dd9-a8e5-68eee62eb39b/Entities',
        result: false
    },
    {url: 'https://blueprintjs.com/docs/#core/components/spinner', result: false},
    {url: 'http://localhost:3000/systems', result: false},
    {url: 'http://www.baidu.com', result: false},
    {url: 'http://www.yahoo.com', result: false},
    {url: 'http://www.test.com/dir/filename.jpg?var1=foo#bar', result: false},
    {url: 'http://localhost:3000/systems#hard', result: false},
    {url: 'http://www.google.co.in', result: false},
    {url: 'http://www.amazon.co.jp', result: false},
    {url: 'http://www.pinterest.com', result: false},
];

const testWrongUrls = [
    {url: 'http', result: 'Invalid url address'},
    {url: 'asdasdasdasdasdasdasdasdasdasd', result: 'Invalid url address'},
];

describe('isUrl tests', function () {
    describe('Url must be valid', function () {
        testUrlsOK.forEach((element) => {
            it(`${element.url} should return "${element.result}"`, function () {
                expect(isUrl(element.url)).to.equal(false);
            });
        })
    });
    
    describe('Url must be inValid', function () {
        testWrongUrls.forEach((element) => {
            it(`${element.url} should return "${element.result}"`, function () {
                expect(isUrl(element.url)).to.equal('Invalid url address');
            });
        })
    });
});
