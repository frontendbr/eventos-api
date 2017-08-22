process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;

chai.use(sinonChai);

const filter = require('../../server/database/event-filter');

describe('Given title \'Um evento\'', () => {
    const event = {
        title: 'Um evento'
    }
    describe('when filter keyword', () => {
        it('evento should be match', () => {
            const keywords = 'evento'
            const match = filter({ event, keywords });
            match.should.be.true;
        });
        it('loco not should be match', () => {
            const keywords = 'loco'
            const match = filter({ event, keywords });
            match.should.be.false;
        });
    });
});

describe('Given month \'Agosto\'', () => {
    const event = {
        date: {
            month: 'Agosto'
        }
    }
    describe('when filter month', () => {
        it('Agosto should be match', () => {
            const month = 'Agosto';
            const match = filter({ event, month });
            match.should.be.true;
        });
        it('Maio not should be match', () => {
            const month = 'Maio';
            const match = filter({ event, month });
            match.should.be.false;
        });
    });

});


describe('Given state \'SP\'', () => {
    const event = {
        location: {
            state: 'SP'
        }
    }
    describe('when filter state', () => {
        it('SP should be match', () => {
            const state = 'SP';
            const match = filter({ event, state });
            match.should.be.true;
        });
        it('RJ not should be match', () => {
            const state = 'RJ';
            const match = filter({ event, state });
            match.should.be.false;
        });
    });

});