process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;

chai.use(sinonChai);

const factory = require('../../../src/api/events/event-factory');
const body = {
    location: {}
};

describe('Give on body request', () => {
    describe('on call insert', () => {
        it('should create a event', () => {

            const event = factory.insert(body);
            event.should.been.object;
            event.location.should.been.object;
            event.pending.should.be.true;
        });
    });

    describe('on call update', () => {
        it('should create a event', () => {
            const body = {
                location: {}
            };
            const event = factory.update(body);
            event.should.been.object;
            event.location.should.been.object;
            event.pending.should.be.true;
        });

        it('should update pending on approve', () => {
            body.approve = true;

            const event = factory.update(body);
            event.should.been.object;
            event.location.should.been.object;
            event.pending.should.be.false;
        });
    });
});