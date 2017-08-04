process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.use(sinonChai);

describe('Login Request Module', () => {
    describe('init', () => {
        it('correct', () => {
            const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

            assert.isFunction(loginRequest);
            assert.isObject(loginRequest({}));
            assert.isFunction(loginRequest({}).authentication);
        });
    });
    describe('should execute authentication', () => {
        describe('and return error', () => {
            it('when not have Authorization', () => {
                const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);
                const req = { get: () => { } };
                const res = { status: () => { } };

                const status = sinon.stub(res, 'status').returns({ json: () => { } });

                const next = {};
                //simulando a chamada do middleware
                loginRequest({}).authentication(req, res, next);
                status.should.have.been.calledWith(401);
            });
            it('when not have credential valid', () => {

                const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

                const firebase = mocks.getModule('firebase');

                const req = { get: () => { return 'token' } };
                const res = { status: () => { } };

                const status = sinon.stub(res, 'status').returns({ json: () => { } });

                const sign = sinon.stub(firebase.auth(), 'signInWithCredential').returns(new Promise((resolve, reject) => { reject({ error: 'error' }) }));

                const next = {};
                //simulando a chamada do middleware
//                loginRequest({}).authentication(req, res, next);
  //              status.should.have.been.calledWith(401);

            });
        });
    });
});