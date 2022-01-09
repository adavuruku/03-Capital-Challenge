/**
 * The AppResponse class
 */
import { HttpStatus } from '@nestjs/common';
import { ResponseOption } from '../../../interphases/response-option';
import * as _ from 'lodash';
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
    console.log('response res', response);
    return response;
  }
  /**
   * @param {ResponseOption} option: required email for search
   * @return {Object} The formatted response
   */
  static async getResponse(option: ResponseOption) {
    try {
      const meta: any = AppResponse.getHttpMeta(option.success, option.code);
      if (option.token) {
        meta.token = option.token;
      }
      Object.assign(meta, { statusCode: option.code });
      if (option.message) {
        meta.message = option.message;
      }
      const useData = _.omit(option.value, [
        'password',
        'accountVerifiedExpire',
        'verificationCode',
        'accountVerified',
      ]);
      return AppResponse.format(meta, useData);
    } catch (e) {
      throw e;
    }
  }
}
