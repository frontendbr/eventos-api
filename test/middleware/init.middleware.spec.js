const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const path = require('path');
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.should();
chai.use(sinonChai);

describe('Middleware', () => {
	describe('init', () => {
		it('correct', () => {
			const router = sinon.stub(mocks.getModule('express'), 'Router');
			router.returns(mocks.getModule('express')());

			const middleware = mocks.init(path.join(__dirname, '/../../src/middleware/'), ['express',
				'./default-middleware-application',
				'./passport-middleware'
			]);

			assert.isNotNull(middleware({}));
			router.should.have.been.called;
			mocks.getModule('./passport-middleware').should.have.been.called;
			mocks.getModule('./default-middleware-application').should.have.been.called;
		});
	});
});
