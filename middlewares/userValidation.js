import { Validator, serverResponse } from '../helpers';

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const isLoginInfoValid = (req, res, next) => {
	if (req.isAuthenticated()) {
		return serverResponse(res, 422, 'You are already authenticatred');
	}
	let validator = new Validator(req.body);
	const { error } = validator.validateInput('user', 'login');
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
export const isSignUpInfoValid = (req, res, next) => {
	if (req.isAuthenticated()) {
		return serverResponse(res, 422, 'You are already authenticatred');
	}
	delete req.body.confirmPassword;
	let validator = new Validator(req.body);
	const { error } = validator.validateInput('user', 'signup');
	if (!error) return next();

	const errorMsg = validator.getErrorMessage(error);
	return serverResponse(res, 400, errorMsg);
};
