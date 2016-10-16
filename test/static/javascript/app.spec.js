var assert = chai.assert;

describe('app', function() {
  it('should return 5 if 2 and 3 are passed', function() {
    assert(add(2,3) == 5);
  });
  
   it('should throw error if "string" and 3 are passed', function() {
    assert.throws( function() { add("string",3)}, Error);
  });
  
});