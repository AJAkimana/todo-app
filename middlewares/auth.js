import { serverResponse } from '../helpers';

export const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	return serverResponse(res, 401, 'Sorry, you are not authorized');
};
