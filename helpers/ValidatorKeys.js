import Joi from 'joi';

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
			email: Joi.string().email(),
			username: Joi.string(),
			password: Joi.string().required()
		};
		const signUp = {
			...login,
			phone: Joi.string().required(),
			username: Joi.string().required(),
			accessLevel: Joi.number().required(),
			names: Joi.string().required(),
			gender: Joi.string().valid('Male', 'Female').required()
		};
		return action === 'login' ? login : signUp;
	}
}
