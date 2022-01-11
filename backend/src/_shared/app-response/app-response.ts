/**
 * The AppResponse class
 */
import { HttpStatus } from '@nestjs/common';
import { ResponseOption } from '../../interphases/response-option';
import * as _ from 'lodash';
import { recursivelyCleanMongooseDocument } from '../helpers/helpers';
export class AppResponse {
  /**
   * @param {Object} success the meta object
   * @return {Object} The success response object
   */
  static getHttpMeta(success: boolean, status: HttpStatus) {
    return { statusCode: status, success };
  }

  /**
   * @param {Object} meta the meta object
   * @param {Object} data success response object
   * @return {Object} The success response object
   */
  static format(meta: any, data = null) {
    const response: any = {};
    response.meta = meta;
    if (data) {
      response.data = data;
    }
    return response;
  }
  /**
   * @param {ResponseOption} option: required email for search
   * @return {Object} The formatted response
   */
  static async getResponse(option: ResponseOption) {
    try {
      const cleanValue = [
        'password',
        'user',
        'accountVerifiedExpire',
        'verificationCode',
        'accountVerified',
        '__v',
        'deleted',
      ];
      let useData = null;
      const meta: any = AppResponse.getHttpMeta(option.success, option.code);
      if (option.token) {
        meta.token = option.token;
      }
      Object.assign(meta, { statusCode: option.code });
      if (option.message) {
        meta.message = option.message;
      }
      // console.log(option.value);
      if (option.value) {
        if (_.isArray(option.value)) {
          useData = await option.value.map((ele) => {
            return ele._doc
              ? _.omit(ele._doc, cleanValue)
              : _.omit(ele, cleanValue);
          });
        }
        if (_.isObjectLike(option.value) && !_.isArray(option.value)) {
          useData = option.value._doc
            ? _.omit(option.value._doc, cleanValue)
            : _.omit(option.value, cleanValue);
        }
      }
      return AppResponse.format(meta, useData);
    } catch (e) {
      throw e;
    }
  }
}
