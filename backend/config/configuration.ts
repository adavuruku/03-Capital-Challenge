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
			production: process.env.DB_TEST_URL
		}
	},
    emailTemplates: {},
    },
  });
  