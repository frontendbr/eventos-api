process.env.NODE_ENV = 'test';

const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require("sinon-chai");
const should = chai.should();
const assert = chai.assert;
const mocks = require('../mock-utils');

chai.use(sinonChai);

describe('Signout', () => {
	describe('init', () => {
	  it('correct', () => {
			const signOut = mocks.init(__dirname + '/../../src/middleware/signout-middleware', []);
            
            const app = mocks.getModule('express')();
            const useApp = sinon.stub(app, 'use');

            const db = mocks.getModule('./database');
            const dbSignout = sinon.stub(db, 'signOut');

            assert.isNotNull(signOut({ app, db }));
			useApp.should.have.been.called;
			db.should.have.been.called;
      });          
    });

    describe('should call signOut', function(){
        const signOut = mocks.init(__dirname + '/../../src/middleware/signout-middleware', []);
        let callback;

        const app = {
            use: function(callback){
                middleware = callback;
            }
        }

        const db = {
            signOut: () => {}
        };
        const dbSignout = sinon.stub(db, 'signOut').returns(new Promise((resolve, reject)=>{ resolve()}));
        
        signOut({ app, db });

        //simulando a chamada do middleware
        middleware();

        dbSignout.should.have.been.called;


    })
});
