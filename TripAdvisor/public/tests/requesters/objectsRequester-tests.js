import { objectsRequester } from 'objectsRequester';
const expect = chai.expect;

describe('objectsRequester tests', function() {
    let genericRequesterSpy = {};

    beforeEach(() => {
        genericRequesterSpy.get = sinon.spy();
        genericRequesterSpy.post = sinon.spy();
        genericRequesterSpy.put = sinon.spy();    
        genericRequesterSpy.patch = sinon.spy();
        genericRequesterSpy.search = sinon.spy()    
    });

    afterEach(() => {
        genericRequesterSpy = {};
    });

    describe('Zero tests', function() {
        it('expect objectsRequester() to throw when passed null genericRequester', function () {    
            const action = function() {
                objectsRequester(null);
            };

            expect(action).to.throw('cannot be null');
        });
        
        it('expect objectsRequester() to not throw when passed not null', function () {    
            const action = function() {
                objectsRequester(genericRequesterSpy);
            };

            expect(action).to.not.throw();
        });

        it('expect objectsRequester() to have property getObjectsPage', function() {
            expect(objectsRequester(genericRequesterSpy)).to.have.property('getObjectsPage');
        });

        it('expect objectsRequester() to have property addNewObject', function() {
            expect(objectsRequester(genericRequesterSpy)).to.have.property('addNewObject');
        });
        
        it('expect objectsRequester() to have property getSpecificObject', function() {
            expect(objectsRequester(genericRequesterSpy)).to.have.property('getSpecificObject');
        });
        
        it('expect objectsRequester() to have property editSpecificObject', function() {
            expect(objectsRequester(genericRequesterSpy)).to.have.property('editSpecificObject');
        });
        
        it('expect objectsRequester() to have property searchAllObjects', function() {
            expect(objectsRequester(genericRequesterSpy)).to.have.property('searchAllObjects');
        });
        
    });

    describe('getObjectsPage', function() {
        it('expect getObjectsPage() to call genericRequester` get function once', function() {
            objectsRequester(genericRequesterSpy).getObjectsPage();

            expect(genericRequesterSpy.get.calledOnce).to.be.true;
        });
        
        it('expect getObjectsPage() to call genericRequester` get function with the given directory and page number', function() {
            let expectedDirectory = 'directory/1';
            objectsRequester(genericRequesterSpy).getObjectsPage('directory', '1');

            expect(genericRequesterSpy.get.calledWith(expectedDirectory)).to.be.true;
        });
    });

    
    describe('addNewObject', function() {
        it('expect addNewObject() to call genericRequester` post function once', function() {
            objectsRequester(genericRequesterSpy).addNewObject();

            expect(genericRequesterSpy.post.calledOnce).to.be.true;
        });
        
        it('expect addNewObject() to call genericRequester` post function with the given directory and data', function() {
            let expectedDirectory = 'dirName';
            let expectedData = {
                content: 'hidden'
            };

            objectsRequester(genericRequesterSpy).addNewObject('dirName', {
                content: 'hidden'
            });

            expect(genericRequesterSpy.post.calledWith(expectedDirectory, expectedData)).to.be.true;
        });
    });

    describe('getSpecificObject', function() {
        it('expect getSpecificObject() to call genericRequester` put function once', function() {
            objectsRequester(genericRequesterSpy).getSpecificObject();

            expect(genericRequesterSpy.put.calledOnce).to.be.true;
        });
        
        it('expect getSpecificObject() to call genericRequester` put function with the given directory and searchParams', function() {
            let expectedDirectory = 'dirName';
            let expectedSearchParam = 'someSearchParams';

            objectsRequester(genericRequesterSpy).getSpecificObject('dirName', 'someSearchParams');

            expect(genericRequesterSpy.put.calledWith(expectedDirectory, expectedSearchParam)).to.be.true;
        });
    });
    
    describe('editSpecificObject', function() {
        it('expect editSpecificObject() to call genericRequester` patch function once', function() {
            objectsRequester(genericRequesterSpy).editSpecificObject();

            expect(genericRequesterSpy.patch.calledOnce).to.be.true;
        });
        
        it('expect editSpecificObject() to call genericRequester` patch function with the given directory and info', function() {
            let expectedDirectory = 'dirName';
            let expectedInfo = 'someInfo';

            objectsRequester(genericRequesterSpy).editSpecificObject('dirName', 'someInfo');

            expect(genericRequesterSpy.patch.calledWith(expectedDirectory, expectedInfo)).to.be.true;
        });
    });
        
    describe('searchAllObjects', function() {
        it('expect searchAllObjects() to call genericRequester` search function once', function() {
            objectsRequester(genericRequesterSpy).searchAllObjects();

            expect(genericRequesterSpy.search.calledOnce).to.be.true;
        });
        
        it('expect searchAllObjects() to call genericRequester` search function with the given name and api/all directory', function() {
            let expectedName = {
                name: 'name'
            };

            objectsRequester(genericRequesterSpy).searchAllObjects('name');

            expect(genericRequesterSpy.search.calledWith('api/all', expectedName)).to.be.true;
        });
    });
});

mocha.run();
