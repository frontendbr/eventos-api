const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const path = require('path');
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.should();
chai.use(sinonChai);

describe('Signout', () => {
	describe('init', () => {
		let app;
		it('correct', () => {
			const signOut = mocks.init(path.join(__dirname, '/../../src/middleware/signout-middleware'), []);

			app = mocks.getModule('express')();
			const useApp = sinon.stub(app, 'use');

			const db = mocks.getModule('./database');
			sinon.stub(db, 'signOut');

			assert.isNotNull(signOut({
				app,
				db
			}));
			useApp.should.have.been.called;
			db.should.have.been.called;
		});

		after(function () {
			app.use.restore(); // Unwraps the spy
		});
	});

	describe('should call signOut', function () {
		let middleware;

		it('return ok', function () {
			const signOut = mocks.init(path.join(__dirname, '/../../src/middleware/signout-middleware'), []);
			const app = {
				use: function (next) {
					middleware = next;
				}
			};

			const db = {
				signOut: () => {}
			};
			const dbSignout = sinon.stub(db, 'signOut').returns(new Promise((resolve, reject) => {
				resolve();
			}));

			signOut({
				app,
				db
			});

			// simulando a chamada do middleware
			middleware();

			dbSignout.should.have.been.called;
		});

		it('return error', function () {
			const signOut = mocks.init(path.join(__dirname, '/../../src/middleware/signout-middleware'), []);

			const app = {
				use: function (next) {
					middleware = next;
				}
			};

			const db = {
				signOut: () => {}
			};
			const dbSignout = sinon.stub(db, 'signOut')
				.returns(new Promise((resolve, reject) => {
					reject(new Error({
						error: 'error'
					}));
				}));

			signOut({
				app,
				db
			});

			// simulando a chamada do middleware
			middleware();

			dbSignout.should.have.been.called;
		});
	});
});
