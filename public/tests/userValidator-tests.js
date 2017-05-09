import {userValidator} from 'userValidator';
const expect = chai.expect;

describe('userValidator tests', function () {
    it('validateUser should not throw when a valid user is passed', function () {
        const user = {
            username: 'validUser',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .not
            .throw();
    });

    it('validateUser should throw when user with empty username is passed', function () {
        const user = {
            username: '',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('Username cannot be empty');
    });

    it('validateUser should throw when user with short username is passed', function () {
        const user = {
            username: 'u',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('more than');
    });

    it('validateUser should throw when user with non-latin username is passed', function () {
        const user = {
            username: 'здр,кпр',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('latin');
    });

    it('validateUser should throw when user with empty email is passed', function () {
        const user = {
            username: 'validUsername',
            email: '',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('cannot be empty');
    });

    it('validateUser should throw when user with invalid email is passed', function () {
        const user = {
            username: 'validUsername',
            email: 'invalidmail',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('Invalid email');
    });

    it('validateUser should throw when user with empty password is passed', function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: '',
            confirmPassword: '',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('empty');
    });

    it('validateUser should throw when user with short password is passed', function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: '1',
            confirmPassword: '1',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('less than');
    });

    it('validateUser should throw when user with unmatching password and confirm passwor' +
            'd is passed',
    function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword1',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('do not match');
    });

    it('validateUser should throw when user with empty secret question is passed', function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: '',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('empty');
    });

    it('validateUser should throw when user with short secret question is passed', function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'Q?',
            secretAnswer: 'aValidAnswer'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('less than');
    });

    it('validateUser should throw when user with empty secret answer is passed', function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: ''
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('empty');
    });

    it('validateUser should throw when user with short secret answer is passed', function () {
        const user = {
            username: 'username',
            email: 'valid@email.com',
            password: 'validPassword',
            confirmPassword: 'validPassword',
            secretQuestion: 'aValidQuestion',
            secretAnswer: 'a.'
        };

        const action = function () {
            userValidator().validateUser(user);
        };

        expect(action)
            .to
            .throw('less than');
    });
});

