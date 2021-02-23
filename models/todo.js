import { BaseModel } from './base';

const todos = require('./data/todos.json');
const fileTodo = './models/data/todos.json';
export class Todo extends BaseModel {
	constructor() {
		super(todos, fileTodo);
	}
}
