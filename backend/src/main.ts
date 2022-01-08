import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ResponseFilter } from './_shared/filters/response.filter';
import { ValidationPipe } from './_shared/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true,
    bodyParser:true,
  });
  app.use(morgan('tiny'))
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  if (true) {
    const options = new DocumentBuilder()
      .setTitle('03 Capital Coding Challenge Service')
      .setDescription('The 03 Capital Coding Challenge Service API description')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(config.get('service.port'), () =>
    Logger.log(
      `App Service is listening at port ${config.get('service.port')} ...`,
    ),
  );
}
bootstrap();
