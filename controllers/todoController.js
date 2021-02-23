import { Todo } from '../models';
import { serverResponse } from '../helpers/utils';

const todoDb = new Todo();
export const createATodo = async (req, res) => {
	return serverResponse(res, 200, 'It is working');
};
export const getTodos = async (req, res) => {
	const todos = todoDb.findAll();
	return serverResponse(res, 200, 'Success', todos);
};
