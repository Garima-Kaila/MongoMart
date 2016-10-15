var chai = require('chai');
var assert = chai.assert; 
var sinon = require('sinon');

var Routes = require('../app/routes');




var mockApp;
describe('Routes', function() {
  beforeEach(function() {
    mockApp ={
		get: sinon.spy(),
		post: sinon.spy()
	};
  });
  
  
  it('create() should build root route for get', function() {
	Routes.create(mockApp);
	
	assert(mockApp.get.calledOnce);
	
  });
  
  it('create() should build route "/submit" for post ', function() {
	Routes.create(mockApp);
	
	assert(mockApp.post.calledWith("/submit1"));
  });
  
});
  