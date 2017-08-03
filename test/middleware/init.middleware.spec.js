process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.use(sinonChai);

describe('Middleware', () => {
	describe('init', () => {
	  it('correct', () => {
			const middleware = mocks.init(__dirname + '/../../src/middleware/', ['express',
																																					'./default-middleware-application',
																																					'./passport-middleware']);

			assert.isNotNull(middleware({}));
			mocks.getModule('express-router').should.have.been.called;
			mocks.getModule('./passport-middleware').should.have.been.called;
			mocks.getModule('./default-middleware-application').should.have.been.called;
	  });
  });
});
