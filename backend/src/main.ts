require('dotenv').config({ path: '../.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ResponseFilter } from './_shared/filters/response.filter';
import { ValidationPipe } from './_shared/pipes';
import * as cookieParser from 'cookie-parser';
console.log('env :', process.env.SERVER_SECRET);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  if (config.get('service.enableSwagger')) {
    const options = new DocumentBuilder()
      .setTitle('03 Capital Coding Challenge Service')
      .setDescription('The 03 Capital Coding Challenge Service API description')
      .setVersion('0.0.1')
      .setContact(
        'Abdulraheem Sherif Adavuruku',
        'https://gitub.com/adavuruku',
        'aabdulraheemsherif@mail.com',
      )
      .addBearerAuth(
        {
          // I was also testing it without prefix 'Bearer ' before the JWT
          description: `Please enter access token here!`,
          name: 'Authorization',
          bearerFormat: 'Bearer', // this will automatically convert it to Bearer AccessToken
          scheme: 'Bearer',
          type: 'http', // I`ve attempted type: 'apiKey' too
          in: 'Header',
        },
        'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(config.get('service.port'), () =>
    Logger.log(
      `App Service is listening at port ${config.get('service.port')} ...`,
    ),
  );
  // FZg6CHUf8t
  // 15b20fff8b2e486461594aaa639533b3
  // 'sumailahawa22@gmail.com
}
bootstrap();
