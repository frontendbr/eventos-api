const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.should();
chai.use(sinonChai);

describe('Login Request Module', () => {
	describe('init', () => {
		it('correct', () => {
			const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

			assert.isFunction(loginRequest);
			assert.isObject(loginRequest({}));
			assert.isFunction(loginRequest({}).authentication);
			assert.isFunction(loginRequest({}).admin);
		});
	});
	describe('should execute admin', () => {
		describe('and return error', () => {
			it('when not have Authorization', () => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);
				const req = {
					get: () => {}
				};
				const res = {
					status: () => {}
				};

				const status = sinon.stub(res, 'status').returns({
					json: () => {}
				});

				const next = {};
				// simulando a chamada do middleware
				loginRequest({}).admin(req, res, next);
				status.should.have.been.calledWith(401);
			});
			it('when not have credential valid', () => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

				const firebase = mocks.getModule('firebase');

				const req = {
					get: () => {
						return 'token';
					}
				};
				const res = {
					status: () => {}
				};

				sinon.stub(res, 'status').returns({
					json: () => {}
				});

				sinon.stub(firebase.auth(), 'signInWithCredential').returns(new Promise((resolve, reject) => {
					reject(new Error({
						error: 'error'
					}));
				}));

				const next = {};
				// simulando a chamada do middleware
				loginRequest({}).admin(req, res, next);
			});

			it('when not has admin email valid', (done) => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

				const firebase = mocks.getModule('firebase');

				const req = {
					get: () => {
						return 'token';
					}
				};
				const res = {
					status: () => {}
				};

				const status = sinon.stub(res, 'status').returns({
					json: () => {
						status.should.have.been.calledWith(401);
						done();
					}
				});

				sinon.stub(firebase.auth(), 'signInWithCredential').returns(new Promise((resolve, reject) => {
					resolve({
						email: 't@tes.com.br'
					});
				}));

				const next = sinon.spy(() => {});

				const db = {
					listAdmins: () => {
						return new Promise((resolve, reject) => {
							resolve(['t1@tes.com.br']);
						});
					}
				};

				// simulando a chamada do middleware
				loginRequest({
					db
				}).admin(req, res, next);
			});

			afterEach(() => {
				const firebase = mocks.getModule('firebase');
				if (firebase.auth().signInWithCredential.restore) {
					firebase.auth().signInWithCredential.restore();
				}
			});
		});

		describe('and return success', () => {
			it('when has admin email valid', (done) => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

				const firebase = mocks.getModule('firebase');

				const req = {
					get: () => {
						return 'token';
					}
				};
				const res = {
					status: () => {}
				};

				sinon.stub(res, 'status').returns({
					json: () => {}
				});

				sinon.stub(firebase.auth(), 'signInWithCredential').returns(new Promise((resolve, reject) => {
					resolve({
						email: 't@tes.com.br'
					});
				}));

				const next = sinon.spy(() => {
					next.should.have.been.called;
					done();
				});

				const db = {
					listAdmins: () => {
						return new Promise((resolve, reject) => {
							resolve(['t@tes.com.br']);
						});
					}
				};

				// simulando a chamada do middleware
				loginRequest({
					db
				}).admin(req, res, next);
			});

			after(() => {
				const firebase = mocks.getModule('firebase');
				firebase.auth().signInWithCredential.restore();
			});
		});
	});
	describe('should execute authentication', () => {
		describe('and return success', () => {
			it('when have credential valid', (done) => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

				const firebase = mocks.getModule('firebase');

				const req = {
					get: () => {
						return 'token';
					}
				};
				const res = {
					status: () => {}
				};

				sinon.stub(res, 'status').returns({
					json: () => {}
				});

				sinon.stub(firebase.auth(), 'signInWithCredential').returns(new Promise((resolve, reject) => {
					resolve({
						email: 't@tes.com.br'
					});
				}));

				const next = sinon.spy(() => {
					next.should.have.been.called;
					done();
				});
				// simulando a chamada do middleware
				loginRequest({}).authentication(req, res, next);
			});

			after(() => {
				const firebase = mocks.getModule('firebase');
				firebase.auth().signInWithCredential.restore();
			});
		});

		describe('and return error', () => {
			it('when not have Authorization', () => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);
				const req = {
					get: () => {}
				};
				const res = {
					status: () => {}
				};

				const status = sinon.stub(res, 'status').returns({
					json: () => {}
				});

				const next = {};
				// simulando a chamada do middleware
				loginRequest({}).authentication(req, res, next);
				status.should.have.been.calledWith(401);
			});
			it('when not have credential valid', (done) => {
				const loginRequest = mocks.init('../../src/middleware/login-request-middleware', ['firebase']);

				const firebase = mocks.getModule('firebase');

				const req = {
					get: () => {
						return 'token';
					}
				};
				const res = {
					status: () => {}
				};

				const status = sinon.stub(res, 'status').returns({
					json: () => {
						status.should.have.been.calledWith(401);
						done();
					}
				});

				sinon.stub(firebase.auth(), 'signInWithCredential').returns(new Promise((resolve, reject) => {
					reject(new Error({
						error: 'error'
					}));
				}));

				const next = {};
				// simulando a chamada do middleware
				loginRequest({}).authentication(req, res, next);
			});
		});

		after(() => {
			const firebase = mocks.getModule('firebase');
			firebase.auth().signInWithCredential.restore();
		});
	});
});
