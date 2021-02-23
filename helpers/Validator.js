import Joi from 'joi';
import { ValidatorKeys } from './ValidatorKeys';

export class Validator extends ValidatorKeys {
	constructor(data) {
		super();
		this.data = data;
	}

	/**
	 *
	 * @param {String} type input handler
	 * @param {String} action Request method
	 */
	validateInput(type, action) {
		let validationKeys = null;
		switch (type) {
			case 'user':
				validationKeys = this.getAuthKeys(action);
				break;
			case 'todo':
				validationKeys = this.getTodoAttibutes();
				break;
			default:
				break;
		}
		const schema = Joi.object(validationKeys);
		return schema.validate(this.data);
	}
	/**
	 *
	 * @param {Object} error Generated error from Joi validation
	 */
	getErrorMessage(error) {
		const errors = [];
		const errorsSent = error.details;

		for (let i = 0; i < errorsSent.length; i += 1) {
			errors.push(errorsSent[i].message.split('"').join(''));
		}
		return errors[0];
	}
}
