// import crypto from 'crypto';
// // import config from 'config';
// // import {getHtmlFromEmailTemplate} from './helpers';

// /**
//  * The UserValidation class
//  */
// const AuthEmail = {
// 	/**
// 	 * @param {Object} auth The object to perform validation on
// 	 * @param {String} verifyRedirectUrl The redirect url
// 	 * @return {Object} The template object fot send grid.
// 	 */
// 	async verifyCode(auth, verifyRedirectUrl) {
// 		const verifyToken = crypto.createHash('md5').update(auth.verificationCode).digest('hex');
// 		const link = `${verifyRedirectUrl}/${auth.email}/${verifyToken}`;
// 		const content = {
// 			email: auth.email,
// 			subject: `${config.get('app.appName')} - Verify Account`,
// 			verifyLink: `${link}`,
// 			verifyCode: `${auth.verificationCode}`
// 		};
// 		const html = await getHtmlFromEmailTemplate(content, config.get('emailAlerts.template.verify'));
// 		console.log('html ::: ', html);
// 		return {
// 			html,
// 			recipients: [auth.email],
// 			subject: `${config.get('app.appName')} - Verify Account`,
// 			substitutions: {...content}
// 		};
// 	},

// 	/**
// 	 * @param {Object} auth The object to perform validation on
// 	 * @param {String} redirectUrl The redirect url
// 	 * @return {Object} The template object fot send grid.
// 	 */
// 	async resetPassword(auth, redirectUrl) {
// 		const recoveryToken = crypto.createHash('md5').update(auth.passwordResetCode).digest('hex');
// 		const link = `${redirectUrl}/${auth.email}/${recoveryToken}`;
// 		const content = {
// 			email: auth.email,
// 			subject: `${config.get('app.appName')} - Verify Account`,
// 			resetLink: `${link}`,
// 			resetCode: `${auth.passwordResetCode}`
// 		};
// 		// const html = await getHtmlFromEmailTemplate(content, config.get('emailAlerts.template.reset'));
// 		return {
// 			// html,
// 			recipients: [auth.email],
// 			subject: `${config.get('app.appName')} - Reset Password`,
// 			substitutions: {...content}
// 		};
// 	}
// };

// export default AuthEmail;
