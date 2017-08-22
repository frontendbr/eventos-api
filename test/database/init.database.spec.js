process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.use(sinonChai);

describe('Database', () => {
    let dbInit;

    beforeEach(() => {
        dbInit = mocks.init('../../server/database', ['firebase']);
    });

    describe('init', () => {
        it('correct', () => {
            assert.isFunction(dbInit);

            dbInit((db) => {
                assert.isNotNull(db);
                assert.isFunction(db.signOut);
                assert.isFunction(db.saveEvent);
            });
        });
    })
    describe('firebase', () => {
        it('signOut', () => {
            dbInit((db) => {
                db.signOut();
                mocks.getModule('firebase').auth.should.have.been.called;
            })
        });

        it('saveEvent', () => {
            dbInit((db) => {
                db.saveEvent();
                mocks.getModule('firebase').database.should.have.been.called;
            })
        });
    })
})