export default () => ({
  app: {
    environment: process.env.NODE_ENV || 'development',
    encryption_key: process.env.SERVER_SECRET || 'AppSecret',
    name: process.env.APP_NAME || '03 Capital',
    jwt_expiration: process.env.JWT_EXPIRATION,
    baseUrl: `http://localhost:${process.env.PORT || 7000}`,
  },
  service: {
    serviceName: process.env.SERVICE_NAME || 'App Service',
    enableSwagger: process.env.ENABLE_SAWAGGER,
    port: process.env.PORT || 7000,
    host: process.env.HOST,
    version: 1,
    lang: 'en',
    pagination: {
      itemsPerPage: 10,
    },
    databases: {
      mongodb: {
        development: process.env.DB_URL,
        production: process.env.DB_TEST_URL,
      },
    },
    gmailService: {
      oauth_playground: process.env.OAUTH_PLAYGROUND,
      client_id: process.env.MAILING_SERVICE_CLIENT_ID,
      client_secret: process.env.MAILING_SERVICE_CLIENT_SECRET,
      gmail_password: process.env.CONST_GMAIL_ADDRESS,
      gmail_email: process.env.CONST_GMAIL_PASSWORD,
      gmail_host: process.env.CONST_EMAIL_HOST,
      gmail_port: process.env.CONST_EMAIL_PORT,
    },
    mailOptions: {
      from: process.env.VERIFY_ACCOUNT_FROM_EMAIL,
      verifyLink: process.env.VERIFY_ACCOUNT_LINK,
    },
    emailTemplates: {
      verify_account: 'confirm-account-email-template',
    },
  },
});
