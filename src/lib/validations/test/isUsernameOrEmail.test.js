import isUserNameOrEmail from "../validation/isUsernameOrEmail";

const INVALID_MSG = 'Invalid username or email';

const testFixtures = [
    {value: '1234567', result: INVALID_MSG},
    {value: 'username', result: false},
    {value: 'email@gmail.com', result: false},
    {value: 'invalid@gmail.com12', result: INVALID_MSG},
];

describe('isUsernameOrEmail tests', function () {
    testFixtures.forEach((element) => {
        it(`${element.value} should return "${element.result}"`, function () {
            expect(isUserNameOrEmail(element.value) === element.result).toBe(true);
        });
    })
});
