import { genericRequester } from 'genericRequester';
import 'jquery';
const expect = chai.expect;


describe('genericRequester tests', function () {
    beforeEach(() => {
        sinon.stub($, 'ajax');
    });

    afterEach(() => {
        $.ajax.restore();
    });

    describe('Zero tests', function() {        
        it('expect genericRequester() to have property get', function () {            
            expect(genericRequester()).to.have.property('get');
        });
                
        it('expect genericRequester() to have property post', function () {            
            expect(genericRequester()).to.have.property('post');
        });
                
        it('expect genericRequester() to have property put', function () {            
            expect(genericRequester()).to.have.property('put');
        });
                
        it('expect genericRequester() to have property patch', function () {            
            expect(genericRequester()).to.have.property('patch');
        });
                
        it('expect genericRequester() to have property search', function () {            
            expect(genericRequester()).to.have.property('search');
        });
    });

    describe('GET tests', function() {
        // GET TESTS
        it('expect get() to call ajax once', function () {
            genericRequester().get();
            
            expect($.ajax.callCount).to.equal(1);
        });

        it('expect get() to call ajax with type GET', function () {
            genericRequester().get();

            expect($.ajax.calledWithMatch({type: 'GET'})).to.be.true;
        });
            
        it('expect get() to call ajax with content type application/json', function () {
            genericRequester().get();

            expect($.ajax.calledWithMatch({
                contentType: 'application/json'
            })).to.be.true;
        });
            
        it('expect get() to call ajax with the given URL', function () {
            genericRequester().get('someURL');

            expect($.ajax.calledWithMatch({url: 'someURL'})).to.be.true;
        });
    });

    
    describe('POST tests', function() {
        it('expect post() to call ajax once', function () {
            genericRequester().post();
            
            expect($.ajax.callCount).to.equal(1);
        });
        
        it('expect post() to call ajax with type POST', function () {
            genericRequester().post();
            
            expect($.ajax.calledWithMatch({type: 'POST'})).to.be.true;
        });
                    
        it('expect post() to call ajax with content type application/json', function () {
            genericRequester().post();

            expect($.ajax.calledWithMatch({
                contentType: 'application/json'
            })).to.be.true;
        });

        it('expect post() to call ajax with the given URL', function () {
            genericRequester().post('someURL');
            
            expect($.ajax.calledWithMatch({url: 'someURL'})).to.be.true;
        });
        
        it('expect post() to call ajax with the given data stringified', function () {
            const data = {
                'some': 'data'
            };
            genericRequester().post(null, data);
            
            expect($.ajax.calledWithMatch({data: JSON.stringify(data)})).to.be.true;
        });
    });    

        
    describe('PUT tests', function() {
        it('expect put() to call ajax once', function () {
            genericRequester().post();
            
            expect($.ajax.callCount).to.equal(1);
        });
        
        it('expect put() to call ajax with type PUT', function () {
            genericRequester().put();
            
            expect($.ajax.calledWithMatch({type: 'PUT'})).to.be.true;
        });
                    
        it('expect put() to call ajax with content type application/json', function () {
            genericRequester().put();

            expect($.ajax.calledWithMatch({
                contentType: 'application/json'
            })).to.be.true;
        });

        it('expect put() to call ajax with the given URL', function () {
            genericRequester().put('someURL');
            
            expect($.ajax.calledWithMatch({url: 'someURL'})).to.be.true;
        });
        
        it('expect put() to call ajax with the given data stringified', function () {
            const data = {
                'some': 'data'
            };
            genericRequester().put(null, data);
            
            expect($.ajax.calledWithMatch({data: JSON.stringify(data)})).to.be.true;
        });
    });

            
    describe('PATCH tests', function() {
        it('expect patch() to call ajax once', function () {
            genericRequester().patch();
            
            expect($.ajax.callCount).to.equal(1);
        });
        
        it('expect patch() to call ajax with type PATCH', function () {
            genericRequester().patch();
            
            expect($.ajax.calledWithMatch({type: 'PATCH'})).to.be.true;
        });
                    
        it('expect patch() to call ajax with content type application/json', function () {
            genericRequester().patch();

            expect($.ajax.calledWithMatch({
                contentType: 'application/json'
            })).to.be.true;
        });

        it('expect patch() to call ajax with the given URL', function () {
            genericRequester().patch('someURL');
            
            expect($.ajax.calledWithMatch({url: 'someURL'})).to.be.true;
        });
        
        it('expect patch() to call ajax with the given data stringified', function () {
            const data = {
                'some': 'data'
            };
            genericRequester().patch(null, data);
            
            expect($.ajax.calledWithMatch({data: JSON.stringify(data)})).to.be.true;
        });
    });

                
    describe('SEARCH tests', function() {
        it('expect search() to call ajax once', function () {
            genericRequester().search();
            
            expect($.ajax.callCount).to.equal(1);
        });
        
        it('expect patch() to call ajax with type SEARCH', function () {
            genericRequester().search();
            
            expect($.ajax.calledWithMatch({type: 'SEARCH'})).to.be.true;
        });
                    
        it('expect patch() to call ajax with content type application/json', function () {
            genericRequester().search();

            expect($.ajax.calledWithMatch({
                contentType: 'application/json'
            })).to.be.true;
        });

        it('expect patch() to call ajax with the given URL', function () {
            genericRequester().search('someURL');
            
            expect($.ajax.calledWithMatch({url: 'someURL'})).to.be.true;
        });
        
        it('expect patch() to call ajax with the given data stringified', function () {
            const data = {
                'some': 'data'
            };
            genericRequester().search(null, data);
            
            expect($.ajax.calledWithMatch({data: JSON.stringify(data)})).to.be.true;
        });
    });
});
