import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { User } from '../models';

const { expect } = chai;

chai.use(chaiHttp);

const userDb = new User();
let userId = null;
let mockedUser = { names: 'test', username: 'test', password: 'test' };
describe('User feature', () => {
	it('Should return 201 when user created', (done) => {
		chai
			.request(app)
			.post('/api/auth/signup')
			.send(mockedUser)
			.end((err, res) => {
				expect(res.status).to.equal(201);
				userId = res.body.data.id;
				done();
			});
	});
	it('Should return 401 when credentials are invalid', () => {
		delete mockedUser.names;
		mockedUser.password = 'invalide';
		chai
			.request(app)
			.post('/api/auth/login')
			.send(mockedUser)
			.end((err, res) => {
				expect(res.status).to.equal(401);
			});
	});
	it('Should return 200 when user logout is successul', () => {
		chai
			.request(app)
			.get('/api/auth/logout')
			.end((err, res) => {
				expect(res.status).to.equal(200);
			});
	});
	after(async () => {
		try {
			await userDb.delete(userId);
		} catch (error) {
			throw error;
		}
	});
});
