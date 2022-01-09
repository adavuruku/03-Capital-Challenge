export default () => ({
  app: {
    environment: process.env.NODE_ENV || 'development',
    encryption_key: process.env.SERVER_SECRET || 'AppSecret',
    name: process.env.APP_NAME || '03 Capital',
    baseUrl: `http://localhost:${process.env.PORT || 7000}`,
  },
  service: {
    serviceName: process.env.SERVICE_NAME || 'App Service',
    enableSwagger: true,
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
    mailgun: {
      api_key: process.env.MAILGUN_API_KEY,
      host: process.env.MAILGUN_HOST,
      domain: process.env.MAILGUN_DOMAIN,
      username: process.env.MAILGUN_USERNAME,
    },
    sendGrid: {
      api_key: process.env.SENDGRID_API_KEY,
    },
    mailOptions: {
      from: process.env.VERIFY_ACCOUNT_FROM_EMAIL,
      verifyLink: process.env.VERIFY_ACCOUNT_LINK
    },
    emailTemplates: {
      verify_account: 'confirm-account-email-template',
    },
  },
});
