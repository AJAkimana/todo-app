import { Parser } from 'json2csv';
import { Todo } from '../models';
import { serverResponse } from '../helpers/utils';
import { todoFields } from '../helpers';

const todoDb = new Todo();
/**
 *
 * @param {*} req Request data from the client
 * @param {*} res Response data from server
 */
export const createATodo = async (req, res) => {
	const newTodo = await todoDb.create(req.body);
	return serverResponse(res, 201, 'Success', newTodo);
};
/**
 *
 * @param {*} req Request data from the client
 * @param {*} res Response data from server
 */
export const getTodos = async (req, res) => {
	const todos = await todoDb.findAll();
	return serverResponse(res, 200, 'Success', todos);
};
/**
 *
 * @param {*} req Request data from the client
 * @param {*} res Response data from server
 */
export const getTodoDetails = async (req, res) => {
	const { todoId } = req.params;
	const todo = await todoDb.findOne('id', todoId);
	return serverResponse(res, 200, 'Success', todo);
};
/**
 *
 * @param {*} req Request data from the client
 * @param {*} res Response data from server
 */
export const updateTodo = async (req, res) => {
	const { todoId } = req.params;
	const updated = await todoDb.update(req.body, todoId);
	return serverResponse(res, 200, 'Success', updated);
};
/**
 *
 * @param {*} req Request data from the client
 * @param {*} res Response data from server
 */
export const deleteTodo = async (req, res) => {
	const { todoId } = req.params;
	await todoDb.delete(todoId);
	return serverResponse(res, 200, 'SUccessfuly deleted');
};
/**
 *
 * @param {*} req Request data from the client
 * @param {*} res Response data from server
 */
export const downloadCsvTodos = async (req, res) => {
	const todos = await todoDb.findAll();

	const json2csv = new Parser({ fields: todoFields });
	const csv = json2csv.parse(todos);
	res.setHeader('Content-Type', 'text/csv');
	res.setHeader('Content-Disposition', 'attachment; filename=todos.csv');

	return res.end(csv);
};
