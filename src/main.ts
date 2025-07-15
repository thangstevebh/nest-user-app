import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  console.log(`Environment: ${process.env.NODE_ENV}`);

  app.setGlobalPrefix('api/');

  // Interceptor
  // app.useGlobalInterceptors(new TimeoutInterceptor(1000 * 3));

  //Validate
  // app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Nestjs Base API DOCUMENT')
    .setDescription('The Nestjs Base API description')
    .setVersion('2.0')
    .addBearerAuth({
      type: 'http',
      name: 'Authorization',
      in: 'header',
    })
    .addGlobalParameters({
      name: 'client_id',
      in: 'header',
      // required: true,
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
bootstrap();
