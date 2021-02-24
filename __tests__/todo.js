import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { Todo } from '../models';

const { expect } = chai;

chai.use(chaiHttp);

const todoDb = new Todo();
let todoId = null;
const mockedTodo = { title: 'test', description: 'test', priority: 'LOW' };
describe('TODO feature', () => {
	before(async () => {
		try {
			const newTodo = await todoDb.create(mockedTodo);
			todoId = newTodo.id;
		} catch (error) {
			throw error;
		}
	});
	it('Should return all todos', () => {
		chai
			.request(app)
			.get('/api/todos')
			.end((err, res) => {
				expect(res.status).to.equal(200);
			});
	});
	it('Should return a todo detail', () => {
		chai
			.request(app)
			.get(`/api/todos/${todoId}`)
			.end((err, res) => {
				expect(res.status).to.equal(200);
			});
	});
	it('Should return 401 when create to do with no permission', () => {
		chai
			.request(app)
			.post(`/api/todos`)
			.send(mockedTodo)
			.end((err, res) => {
				expect(res.status).to.equal(401);
			});
	});
	after(async () => {
		try {
			await todoDb.delete(todoId);
		} catch (error) {
			throw error;
		}
	});
});
