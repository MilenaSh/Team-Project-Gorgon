import { itemsController } from 'itemsController';
import 'jquery';
import toastr from 'toastr';
const expect = chai.expect;

describe('itemsController tests', function() {
    let objectRequesterSpy = {};
    let templateLoaderSpy = {};
    let jQ;

    beforeEach(() => {
        objectRequesterSpy.getObjectsPage = sinon.spy();
        objectRequesterSpy.addNewObject = sinon.spy();
        objectRequesterSpy.getSpecificObject = sinon.spy();
        objectRequesterSpy.editSpecificObject = sinon.spy();
        objectRequesterSpy.searchAllObjects = sinon.spy();

        templateLoaderSpy.loadTemplate = sinon.spy();
    });

    afterEach(() => {
        objectRequesterSpy = {};
        templateLoaderSpy = {};
    });

    describe('Zero tets', function() {
        it('expect itemsController to throw when passed null objectRequester', function() {
            const action = function() {
                itemsController(null, templateLoaderSpy);
            };

            expect(action).to.throw('requester cannot be null');
        });
        
        it('expect itemsController to throw when passed null templateLoader', function() {
            const action = function() {
                itemsController(objectRequesterSpy, null);
            };

            expect(action).to.throw('loader cannot be null');
        });

        it('expect itemsController to have property displayAddItemPage', function() {
            const sut = itemsController(objectRequesterSpy, templateLoaderSpy);

            expect(sut).to.have.property('displayAddItemPage');
        });
        
        it('expect itemsController to have property displayItemDetailsPage', function() {
            const sut = itemsController(objectRequesterSpy, templateLoaderSpy);

            expect(sut).to.have.property('displayItemDetailsPage');
        });
        
        it('expect itemsController to have property displayPagedList', function() {
            const sut = itemsController(objectRequesterSpy, templateLoaderSpy);

            expect(sut).to.have.property('displayPagedList');
        });                
    });

    describe('displayAddItemPage tests', function() {
        it('expect displayAddItemPage to call templateLoader`s load template once', function(done) {
            const sut = itemsController(objectRequesterSpy, templateLoaderSpy);

            Promise.resolve(sut.displayAddItemPage('templateName', 'selector'))
                .then(expect(templateLoaderSpy.loadTemplate.calledOnce).to.be.true)
                .then(done, done);
        });
    });
});