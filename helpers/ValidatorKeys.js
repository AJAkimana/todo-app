import Joi from 'joi';

/**
 * User input attributes
 */
export class ValidatorKeys {
	getTodoAttibutes() {
		return {
			title: Joi.string().required(),
			description: Joi.string().required(),
			priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required()
		};
	}
	getAuthKeys(action) {
		const login = {
			username: Joi.string(),
			password: Joi.string().required()
		};
		const signUp = {
			...login,
			username: Joi.string().required(),
			names: Joi.string().required()
		};
		return action === 'login' ? login : signUp;
	}
}
