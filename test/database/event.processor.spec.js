process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;

chai.use(sinonChai);

const processor = require('../../src/database/event-processor');


describe('Give a list', () => {
    describe('when process limit 2', () => {
        it('should return a list of length 2', () => {
            const event = {
                val: () => { return {} },
                key: 0
            };
            const snapshot = [event, event, event, event];
            const list = processor.process({ filter: { limit: 2 }, snapshot });
            list.should.be.lengthOf(2);
        });
    });
    describe('when process limit 2 and offset 3', () => {
        it('should return a list of length 1', () => {
            const event = {
                val: () => { return {} },
                key: 0
            };
            const snapshot = [event, event, event, event];
            const list = processor.process({ filter: { offset: 3, limit: 2 }, snapshot });
            list.should.be.lengthOf(1);
        });
    });


});