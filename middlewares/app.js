import { serverResponse } from '../helpers';

/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const monitorDevActions = (req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		const user = req.isAuthenticated()
			? `User: ${req.user.username}`
			: 'UNKNOWN user';
		console.log(`
        Route: ${req.path}, method: ${req.method}, 
        body: ${JSON.stringify(req.body)}, 
        session: ${JSON.stringify(req.session)},
        IP: ${req.ip} `);
	}
	return next();
};
/**
 *
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 */
export const route404 = (req, res) => {
	return serverResponse(res, 404, 'Oops, you seem lost');
};
/**
 *
 * @param {function} fn Express callback promise function
 * @returns {promise} Resolve the promise irrespective
 * resolved or rejected
 */
export const catchErrors = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
/**
 *
 * @param {*} err Error passed from handlers
 * @param {*} req Request data from client
 * @param {*} res Response data from the server
 * @param {*} next Next Middleware
 */
export const handleErrors = (err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(err.stack);
	}
	return serverResponse(res, 500, err.message);
};
