import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { writeFileSync } from 'fs';

/**
 *
 * @param {String} password User password to hash
 */
export const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(process.env.PASS_SALT);
	const hashPass = bcrypt.hashSync(password, salt);
	return hashPass;
};
/**
 *
 * @param {String} password User password
 * @param {String} hashedPass Saved hashed password
 */
export const unHashPassword = (password, hashedPass) => {
	return bcrypt.compareSync(password, hashedPass);
};
/**
 *
 * @param {Response} res Server response
 * @param {Number} statusCode Status code
 * @param {string} message Response message
 * @param {*} data Response data
 */
export const serverResponse = (res, statusCode, message, data) => {
	const messageType = statusCode >= 400 ? 'error' : 'message';
	return res
		.status(statusCode)
		.json({ status: statusCode, [messageType]: message, data });
};
/**
 *
 * @param {Object} userInfo User data to create a token from
 */
export const generatJWT = (userInfo) => {
	const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1w' });
	return token;
};
/**
 *
 * @param {String} filename File to edit
 * @param {String} content Content to write
 */
export const writeJSONFile = (filename, content) => {
	writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
		if (err) {
			console.log(err);
		}
	});
};
