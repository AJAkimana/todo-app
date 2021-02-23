export class BaseModel {
	/**
	 *
	 * @param {Array<{id:String, createdAt: Date,modifiedDate: Date}>} model
	 */
	constructor(model) {
		this.model = model;
	}
	/**
	 *
	 * @param {Object} data
	 */
	create(data = {}) {
		const newRecord = {
			...data,
			createDate: new Date(),
			modifiedDate: new Date()
		};
		this.model.push(newRecord);
		return newRecord;
	}
	/**
	 *
	 * @param {Object} whereConditions
	 */
	findAll(whereConditions) {
		const records = this.model.filter((r) => r.id === whereConditions);
		return records;
	}
	/**
	 *
	 * @param {Object} whereConditions
	 */
	findOne(whereConditions) {
		const record = this.model.find((r) => r.id === whereConditions);
		return record;
	}
	/**
	 *
	 * @param {Object} data
	 * @param {String} recordId
	 */
	update(data, recordId) {
		const recordIndex = this.model.findIndex((r) => r.id === recordId);
		for (const key in data) {
			this.model[recordIndex][key] = data[key];
		}
		this.model[recordIndex]['modifiedDate'] = new Date();

		return this.model[recordIndex];
	}
	/**
	 *
	 * @param {String} recordId
	 */
	delete(recordId) {
		const recordIndex = this.model.findIndex((r) => r.id === recordId);
		this.model.shift(recordIndex);
		return true;
	}
}
