import crypto from 'crypto';
import configuration from '../../../config/configuration';
import * as ejs from 'ejs';
import fs from 'fs';

/**
 * The UserValidation class
 */
const AuthEmail = {
  /**
   * @param {Object} auth The object to perform validation on
   * @param {String} verifyRedirectUrl The redirect url
   * @return {Object} The template object fot send grid.
   */
  async verifyCode(auth, verifyRedirectUrl) {
    const verifyToken = crypto
      .createHash('md5')
      .update(auth.verificationCode)
      .digest('hex');
    const link = `${verifyRedirectUrl}/${auth.email}/${verifyToken}`;
    const content = {
      email: auth.email,
      subject: `${configuration().app.name} - Verify Account`,
      verifyLink: `${link}`,
      verifyCode: `${auth.verificationCode}`,
    };
    const html = await this.getHtmlFromEmailTemplate(
      content,
      configuration().service.emailTemplates.verify_account,
    );
    console.log('html ::: ', html);
    return {
      html,
      recipients: [auth.email],
      subject: `${configuration().app.name} - Verify Account`,
      substitutions: { ...content },
    };
  },

  /**
   * @param {Object} auth The object to perform validation on
   * @param {String} redirectUrl The redirect url
   * @return {Object} The template object fot send grid.
   */
  async resetPassword(auth, redirectUrl) {
    const recoveryToken = crypto
      .createHash('md5')
      .update(auth.passwordResetCode)
      .digest('hex');
    const link = `${redirectUrl}/${auth.email}/${recoveryToken}`;
    const content = {
      email: auth.email,
      subject: `${configuration().app.name} - Reset Password`,
      resetLink: `${link}`,
      resetCode: `${auth.passwordResetCode}`,
    };
    const html = await this.getHtmlFromEmailTemplate(
      content,
      configuration().service.emailTemplates.verify_account,
    );
    return {
      html,
      recipients: [auth.email],
      subject: `${configuration().app.name} - Reset Password`,
      substitutions: { ...content },
    };
  },

  /**
   * convert to uppercase 1st letter
   * @param {Object} content
   * @param {String} templateValue
   * @return {Boolean} The code
   */
  async getHtmlFromEmailTemplate(content, templateValue) {
    try {
      const template = `../templates/email/${templateValue}.ejs`;
      console.log('templateValue : ', templateValue);
      console.log('template :', template);
      return new Promise((resolve, reject) => {
        fs.readFile(template, 'utf8', (err, file) => {
          if (err) {
            throw err;
          }
          const html = ejs.render(file, {
            ...content,
          });
          return resolve(html);
        });
      });
    } catch (e) {
      console.log('email :::: ', e);
      throw e;
    }
  },
};

export default AuthEmail;
