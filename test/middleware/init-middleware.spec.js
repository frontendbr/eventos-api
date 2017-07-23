process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const assert = chai.assert;

const mocks = require('../mock-utils');

describe('Middleware', () => {
	describe('init', () => {
	  it('correct', () => {
			const middleware = mocks.init(__dirname + '/../../src/middleware', ['express']);
			assert.isNotNull(middleware);
	  });
  });
});
