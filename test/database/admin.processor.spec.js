process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;

chai.use(sinonChai);

const processor = require('../../src/database/admin-processor');

describe('Give a snapshot', () => {
    it('should return a array', () => {
        const admin = (email) => {
            return {
                val: () => email,
                key: 0
            }
        };

        const snapshot = [admin('a@t.com'), admin('b@t.com')];
        const list = processor.process({ snapshot });
        list.should.be.lengthOf(2);

    });
});

