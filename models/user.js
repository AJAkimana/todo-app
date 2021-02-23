import { BaseModel } from './base';

const users = require('./data/users.json');
const fileUser = './data/users.json';
export class User extends BaseModel {
	constructor() {
		super(users, fileUser);
	}
}
