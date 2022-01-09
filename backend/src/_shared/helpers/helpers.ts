import crypto from 'crypto';
import fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as randomstring from 'randomstring';
import * as sgMail from '@sendgrid/mail/index';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);
dayjs.tz.setDefault('Africa/Lagos');

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
export const addTimeToDate = (size, time) => {
  // const date = new Date();
  // const hours = date.getHours() + 1;
  // date.setHours(hours);
  const expiryTime = dayjs().add(size, time);
  return expiryTime;
};

/**
 * @param {Number} size Hour count
 * @return {Date} The date
 */
export const verifyDateExpiry = (incomingDate) => {
  // const date = new Date();
  // const hours = date.getHours() + 1;
  // date.setHours(hours);
  const expectedExpiry = dayjs(incomingDate).toString(); //12:00 + 1 : 01:00
  const currentTime = dayjs().toString(); // 12:10 + 1 > 1:10
  return currentTime <= expectedExpiry; //1>=1:10
};

/**
 * @param {Number} size Code length
 * @param {Boolean} alpha Check if it's alpha numeral
 * @return {String} The code
 */
export const generateOTCode = (size = 6, alpha = false) => {
  return randomstring.generate(size);
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
    return value;
  } catch (e) {
    throw Error(e);
  }
};
export const recursivelyCleanMongooseDocument = (value: any) => {
  const cleanValue = [
    'password',
    'accountVerifiedExpire',
    'verificationCode',
    'accountVerified',
    '__v',
    'deleted',
  ];
  if (Array.isArray(value)) {
    return value.map(recursivelyCleanMongooseDocument);
  }
  // if (value !== null && typeof value === 'object') {
  //   return Object.fromEntries(
  //     Object.entries(value).map(([key, value]) => [
  //       key,
  //       recursivelyCleanMongooseDocument(value),
  //     ]),
  //   );
  // }
  if (value !== null) {
    console.log(value, cleanValue);
    const newVal = _.omit({ ...value }, cleanValue);
    const newyVal = _.omit(
      { _id: 'dss', name: 'dsdsd', deleted: 'deee' },
      cleanValue,
    );
    console.log(newVal, newyVal);
    return newVal;
  }
};
/**
 * @return {String}
 */
export const getTodayDateTimeStamp = () => {
  const todayDate = dayjs().format('YYYY-MM-DD').toString();
  return todayDate;
};
