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
 * @param {Number} size Hour count
 * @return {Date} The date
 */
export const addTimeToDate = (size, time) => {
  const expiryTime = dayjs().add(size, time);
  return expiryTime;
};

/**
 * @param {Number} size Hour count
 * @return {Date} The date
 */
export const verifyDateExpiry = (incomingDate, maxDiff, scale) => {
  const expectedExpiry = dayjs(incomingDate).toString(); //12:00 + 1 : 01:00
  return dayjs().diff(expectedExpiry, scale) > maxDiff;
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