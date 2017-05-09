import { userRequester } from 'userRequester';
const expect = chai.expect;

describe('userRequester tests', function() {
    let genericRequesterSpy = {};
    beforeEach(() => {
        genericRequesterSpy.post = sinon.spy();
        genericRequesterSpy.put = sinon.spy();
        genericRequesterSpy.get = sinon.spy();
        genericRequesterSpy.patch = sinon.spy();
    });
    
    afterEach(() => {
        genericRequesterSpy = {};
    });

    describe('Zero tests', function() {
        it('expect userRequester to throw when given null genericRequester', function() {
            const action = function() {
                userRequester(null);
            };

            expect(action).to.throw('cannot be null');
        });

        it('expect userRequester to have property register', function() {
            expect(userRequester(genericRequesterSpy)).to.have.property('register');
        });
        
        it('expect userRequester to have property login', function() {
            expect(userRequester(genericRequesterSpy)).to.have.property('login');
        });
        
        it('expect userRequester to have property getUser', function() {
            expect(userRequester(genericRequesterSpy)).to.have.property('getUser');
        });
        
        it('expect userRequester to have property editUser', function() {
            expect(userRequester(genericRequesterSpy)).to.have.property('editUser');
        });
    });

    describe('login tests', function() {
        it('expect login() to call genericRequester`s put function once', function() {
            userRequester(genericRequesterSpy).login();

            expect(genericRequesterSpy.put.calledOnce).to.be.true;
        });
        
        it('expect login() to call genericRequester`s put function with api/users and the given data', function() {
            const expectedData = 'someData';
            const expectedUrl = 'api/users';

            userRequester(genericRequesterSpy).login('someData');

            expect(genericRequesterSpy.put.calledWith(expectedUrl, expectedData)).to.be.true;
        });
    });
    
    describe('register tests', function() {
        it('expect register() to call genericRequester`s post function once', function() {
            userRequester(genericRequesterSpy).register();

            expect(genericRequesterSpy.post.calledOnce).to.be.true;
        });
        
        it('expect register() to call genericRequester`s post function with api/users and the given data', function() {
            const expectedData = 'someData';
            const expectedUrl = 'api/users';

            userRequester(genericRequesterSpy).register('someData');

            expect(genericRequesterSpy.post.calledWith(expectedUrl, expectedData)).to.be.true;
        });
    });
        
    describe('getUser tests', function() {
        it('expect getUser() to call genericRequester`s get function once', function() {
            userRequester(genericRequesterSpy).getUser();

            expect(genericRequesterSpy.get.calledOnce).to.be.true;
        });
        
        it('expect getUser() to call genericRequester`s get function with api/users/username', function() {
            const expectedUrl = 'api/users/user1'

            userRequester(genericRequesterSpy).getUser('user1');

            expect(genericRequesterSpy.get.calledWith(expectedUrl)).to.be.true;
        });
    });

            
    describe('editUser tests', function() {
        it('expect editUser() to call genericRequester`s patch function once', function() {
            userRequester(genericRequesterSpy).editUser();

            expect(genericRequesterSpy.patch.calledOnce).to.be.true;
        });
        
        it('expect editUser() to call genericRequester`s patch function with api/users and the given data', function() {
            const expectedURL = 'api/users';
            const expectedObject = {
                username: 'user1',
                id: 'userID'
            };

            userRequester(genericRequesterSpy).editUser('user1', 'userID');

            expect(genericRequesterSpy.patch.calledWith(expectedURL, expectedObject)).to.be.true;
        });
    });
});
