import { Validator, serverResponse } from '../helpers';
import { Todo } from '../models';

const todoDb = new Todo();
/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const isTodoInfoValid = (req, res, next) => {
	let validator = new Validator(req.body);
	const { error } = validator.validateInput('todo');
	if (!error) return next();

	const errorMsg = validator.getErrorMessage(error);
	return serverResponse(res, 400, errorMsg);
};
/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const doesTodoExits = async (req, res, next) => {
	const { todoId } = req.params;
	const todoExist = await todoDb.findOne('id', todoId);
	if (todoExist) return next();

	return serverResponse(res, 404, 'Sorry, the record does not exit');
};
