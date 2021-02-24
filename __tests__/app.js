import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('APP test', () => {
	it('should return ok status for root route', () => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				expect(res.status).to.equal(200);
			});
	});
	it('should return route not found 404', () => {
		chai
			.request(app)
			.get('/apiii')
			.end((err, res) => {
				expect(res.status).to.equal(404);
			});
	});
});
