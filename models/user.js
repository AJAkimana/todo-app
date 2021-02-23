import { BaseModel } from './base';

const users = require('./data/users.json');
const fileUser = './models/data/users.json';
export class User extends BaseModel {
	constructor() {
		super(users, fileUser);
	}
}
