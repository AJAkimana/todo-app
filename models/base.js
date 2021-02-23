import { v4 as uuidV4 } from 'uuid';
import { writeJSONFile } from '../helpers';

/**
 * Class base model with all methods
 */
export class BaseModel {
	/**
	 *
	 * @param {Array<{id:String, createdAt: Date,modifiedDate: Date}>} model
	 * @param {String} fileDb Data storage file path
	 */
	constructor(model, fileDb) {
		this.model = model;
		this.fileDb = fileDb;
	}
	/**
	 *
	 * @param {Object} data
	 */
	create(data = {}) {
		return new Promise((resolve, reject) => {
			const id = { id: uuidV4() };
			const date = {
				createDate: new Date(),
				modifiedDate: new Date()
			};
			const newRecord = { ...id, ...data, ...date };
			this.model.push(newRecord);
			writeJSONFile(this.fileDb, this.model);
			resolve(newRecord);
		});
	}
	/**
	 *
	 * @param {Object} whereConditions
	 */
	findAll(whereConditions) {
		return new Promise((resolve, reject) => {
			resolve(this.model);
		});
	}
	/**
	 *
	 * @param {String} key
	 * @param {String} value
	 */
	findOne(key = '', value = '') {
		return new Promise((resolve, reject) => {
			const record = this.model.find((r) => r[key] === value);
			resolve(record);
		});
	}
	/**
	 *
	 * @param {Object} data
	 * @param {String} recordId
	 */
	update(data, recordId) {
		return new Promise((resolve, reject) => {
			const recordIndex = this.model.findIndex((r) => r.id === recordId);
			for (const key in data) {
				this.model[recordIndex][key] = data[key];
			}
			this.model[recordIndex]['modifiedDate'] = new Date();
			writeJSONFile(this.fileDb, this.model);
			resolve(this.model[recordIndex]);
		});
	}
	/**
	 *
	 * @param {String} recordId
	 */
	delete(recordId) {
		return new Promise((resolve, reject) => {
			const records = this.model.filter((r) => r.id !== recordId);
			writeJSONFile(this.fileDb, records);
			resolve();
		});
	}
}
