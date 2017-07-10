//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/js/index');
let should = chai.should();


chai.use(chaiHttp);

describe('Events', () => {;
	describe('/GET event', () => {
	  it('it should GET all the events', (done) => {
			chai.request('http://localhost:8080')
		    .get('/eventos/api/v1/event')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(1);
		      done();
		    });
	  });
  });
});
  