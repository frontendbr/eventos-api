process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
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
				'./middleware/signout-middleware',
				'./views',
				'./api']);

			mocks.getModule('./database').should.have.been.called;
			mocks.getModule('./middleware').should.have.been.called;
			mocks.getModule('./middleware/signout-middleware').should.have.been.called;
			mocks.getModule('./views').should.have.been.called;
			mocks.getModule('./api').should.have.been.called;
			assert.isNotNull(app);
		});
	});
});
