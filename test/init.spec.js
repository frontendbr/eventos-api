process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const assert = chai.assert;

const mocks = require('./mock-utils');

describe('App', () => {
	describe('init', () => {
	  it('correct', () => {
			const app = mocks.init(__dirname + '/../src', ['express',
																										'http',
																										'./database',
																										'./middleware',
																										'./views',
																										'./api']);
			assert.isNotNull(app);
	  });
  });
});
