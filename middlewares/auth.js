import { serverResponse } from '../helpers';

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	return serverResponse(res, 401, 'Sorry, you are not authorized');
};
