import { Validator, serverResponse } from '../helpers';

export const isTodoInfoValid = (req, res, next) => {
	if (req.isAuthenticated()) {
		return serverResponse(res, 409, 'You are already authenticatred');
	}
	let validator = new Validator(req.body);
	const { error } = validator.validateInput('todo');
	if (!error) return next();

	const errorMsg = validator.getErrorMessage(error);
	return serverResponse(res, 400, errorMsg);
};
