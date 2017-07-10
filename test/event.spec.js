process.env.NODE_ENV = 'test';

const chai = require('chai'),
			chaiHttp = require('chai-http'),
			app = require('../src'),
			should = chai.should(),
			server = 'http://localhost:8080/eventos/api/v1';

chai.use(chaiHttp);

describe('Events', () => {;
	describe('/GET event', () => {
	  it('it should GET all the events', (done) => {
			chai.request(server)
		    .get('/event')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(2);
		      done();
		    });
	  });
  });
});
