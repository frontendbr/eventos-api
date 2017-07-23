process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const sinon = require('sinon');

const mocks = require('./mock-utils');

describe('App', () => {
	describe('init', () => {
	  it('correct', () => {
			const app = mocks.init(__dirname + '/../src', ['express',
																										'http',
																										'./database',
																										'./middleware',
																										'./middleware-signout',
																										'./views',
																										'./api']);

      sinon.assert.calledOnce(mocks.getModule('./database'));
			sinon.assert.calledOnce(mocks.getModule('./middleware'));
			sinon.assert.calledOnce(mocks.getModule('./middleware-signout'));
			sinon.assert.calledOnce(mocks.getModule('./views'));
			sinon.assert.calledOnce(mocks.getModule('./api'));
			assert.isNotNull(app);
	  });
  });
});
