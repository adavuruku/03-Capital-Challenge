import crypto from 'crypto';
import fs from 'fs';
import * as bcrypt from 'bcrypt'
// import ejs from 'ejs';
import *  as randomstring from 'randomstring';

// const dayjs = require('dayjs');
// let timezone = require('dayjs/plugin/timezone');
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Africa/Lagos');

/**
 * Convert callback to promise;
 *  @param {String} text
 * @return {String} params date
 */

// export const slugifyText = (text) => {
// 	if (text === null || typeof text === 'undefined') {
// 		return text;
// 	}
// 	if (text.indexOf(' ') >= 0) {
// 		return slugify(text.toLowerCase(), '-');
// 	}
// 	return text.toLowerCase();
// };

/**
 * @param {Number} size Hour count
 * @return {Date} The date
 */
export const addHourToDate = (size) => {
	const date = new Date();
	let hours = date.getHours() + 1;
	date.setHours(hours);
	return date;
};

/**
 * @param {Number} size Code length
 * @param {Boolean} alpha Check if it's alpha numeral
 * @return {String} The code
 */
export const generateOTCode = (size = 6, alpha = false) => {
	return randomstring.generate(size);
	// let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-';
	// const chars = characters.split('');
	// let selections = '';
	// for (let i = 0; i < size; i++) {
	// 	let index = Math.floor(Math.random() * characters.length);
	// 	selections += characters[index];
	// 	chars.splice(index, 1);
	// }
	// return selections;
};
/**
 * Convert callback to promise;
 *  @param {String} string
 * @return {String} params date
 */
export const encrypt = (string, key) => {
	if (string === null || typeof string === 'undefined') {
		return string;
	}
	let cipher = crypto.createCipher('aes-256-cbc', key);
	return cipher.update(string, 'utf8', 'hex') + cipher.final('hex');
};

/**
 * Convert callback to promise;
 *  @param {String} encrypted
 * @return {String} params date
 */
export const decrypt = (encrypted, key) => {
	if (encrypted === null || typeof encrypted === 'undefined') {
		return encrypted;
	}
	// let key = config.get('app.superSecret');
	let decipher = crypto.createDecipher('aes-256-cbc', key);
	try {
		const cip =
			decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
		return cip;
	} catch (e) {
		return encrypted;
	}
};
/**
 * convert to uppercase 1st letter
 * @param {String} value
 * @return {Boolean} The code
 */
export const encryptPassowrd = (value) => {
	if (value === null || typeof value === 'undefined') {
		return value;
	}
	try {
		value = bcrypt.hashSync(value, 10);
		return value
	} catch (e) {
		throw Error(e)
	}
};

/**
 * convert to uppercase 1st letter
 * @param {Object} content
 * @param {String} templateValue
 * @return {Boolean} The code
 */
// export function getHtmlFromEmailTemplate(content, templateValue) {
// 	try {
// 		const template = `./templates/emails/${templateValue}.ejs`;
// 		console.log('templateValue : ', templateValue);
// 		console.log('template :', template);
// 		return new Promise((resolve, reject) => {
// 			fs.readFile(template, 'utf8', (err, file) => {
// 				if (err) {
// 					throw err;
// 				}
// 				const html = ejs.render(file, {
// 					...content
// 				});
// 				return resolve(html);
// 			});
// 		});
// 	} catch (e) {
// 		console.log('email :::: ', e);
// 		throw e;
// 	}
// }

// /**
//  * @return {String}
//  */
// export const getTodayDateTimeStamp = () => {
// 	let todayDate = dayjs().format('YYYY-MM-DD').toString();
// 	return todayDate;
// };
