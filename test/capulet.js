const chai = require('chai');
const capulet = require('../lib/capulet');

const should = chai.should();

const requiredFields = ['a', 'b', 'c'];

describe('capulet', function() {
	it('should only contain a, b and c', function() {
		const config = capulet(requiredFields, { a: 1, b: 3 }, { c: 5 }, { e: 27 });
		const result = config.get();
		result.should.be.an('object');
		result.should.have.all.keys('a', 'b', 'c');
		result.should.not.have.key('e');
	});

	it('should throw when we dont supply b value', function() {
		should.throw(() => capulet(requiredFields, { a: 1, b: 2 }, { e: 27 }));
	});

	it('should be able to retrieve key b', function() {
		const config = capulet(requiredFields, { a: 1, b: 3 }, { c: 5 }, { e: 27 });
		const result = config.get('b');
		result.should.equal(3);
	});

	it('should accept an undefined default value', function() {
		should.not.throw(() => capulet(requiredFields, { a: 1, b: 3 }, { c: undefined }));
	});

	it('should be able to retrieve key and object from the req object', function() {
		const config = capulet(requiredFields, { a: 1, b: 3 }, { c: 5 }, { e: 27 });
		const middleware = config.middleware();
		const req = {};
		middleware(req);
		req.should.have.key('config');
		req.config.should.be.a('function');
		req.config('c').should.equal(5);
		req.config().should.have.all.keys('a', 'b', 'c');
	});
});
