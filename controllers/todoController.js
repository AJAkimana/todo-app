import { Todo } from '../models';
import { serverResponse } from '../helpers/utils';

const todoDb = new Todo();
export const createATodo = async (req, res) => {
	const newTodo = await todoDb.create(req.body);
	return serverResponse(res, 201, 'Success', newTodo);
};
export const getTodos = async (req, res) => {
	const todos = await todoDb.findAll();
	return serverResponse(res, 200, 'Success', todos);
};
export const getTodoDetails = async (req, res) => {
	const { todoId } = req.params;
	const todo = await todoDb.findOne('id', todoId);
	return serverResponse(res, 200, 'Success', todo);
};
export const updateTodo = async (req, res) => {
	const { todoId } = req.params;
	const updated = await todoDb.update(req.body, todoId);
	return serverResponse(res, 200, 'Success', updated);
};
export const deleteTodo = async (req, res) => {
	const { todoId } = req.params;
	await todoDb.delete(todoId);
	return serverResponse(res, 200, 'SUccessfuly deleted');
};
