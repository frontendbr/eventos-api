process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;
const mocks = require('../../mock-utils');

chai.use(sinonChai);


describe('Event', () => {
    describe('need call middleware', () => {
        let eventRegister;
        beforeEach(() => {
            eventRegister = mocks.init('../../src/api/events', ['express']);
            mocks.getModule('express').initCapture();
        });

        afterEach(() => {
            mocks.getModule('express').stopCapture();
        });

        it('loginManager', () => {
            const loginManager = { authentication: () => { } };
            sinon.stub(loginManager, 'authentication');

            
            const router = eventRegister({ loginManager });
            
            //simulando chamada do middleware
            const post = router.captur()[0][2]();

            loginManager.authentication.should.have.been.called;

        });
    });

});