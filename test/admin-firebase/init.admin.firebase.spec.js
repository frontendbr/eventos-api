const chai = require('chai');
const sinonChai = require('sinon-chai');
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.should();
chai.use(sinonChai);

describe('Admin Firebase', () => {
	describe('init', () => {
		it('correct', () => {
			const adm = mocks.init('../../src/admin-firebase', ['firebase-admin']);
			assert.isFunction(adm);
			assert.isNotNull(adm({
				config: {
					serviceAccountAdminPath: './firebase-admin-sdk-test.json'
				}
			}));
		});
	});
	describe('when have config', () => {
		it('have call initialize', () => {
			const adm = mocks.init('../../src/admin-firebase', ['firebase-admin']);
			assert.isFunction(adm);
			assert.isNotNull(adm({
				config: {
					serviceAccountAdminPath: '../../test/admin-firebase/firebase-admin-sdk-test.json'
				}
			}));
			mocks.getModule('firebase-admin').initializeApp.should.have.been.called;
		});
	});
});
