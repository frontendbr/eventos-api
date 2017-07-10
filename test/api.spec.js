process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src');
const should = chai.should();

chai.use(chaiHttp);

describe('API', () => {
	describe('/GET version', () => {
	  it('it should GET the API version', (done) => {
			chai.request(app)
		    .get('/api')
		    .end((err, res) => {
			  	res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.be.a('object').to.deep.equal({"version": "1.0.0"});

		      done();
		    });
	  });
  });
});
