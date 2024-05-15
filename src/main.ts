import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ENVIROMENTS } from './core/constants/environments.constants';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: false,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter);

  app.enableCors();

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === ENVIROMENTS.production ? true : false,
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(', ');
          return accumulator;
        }, {});
        throw new BadRequestException(formattedErrors);
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3004;
  await app.listen(port, '0.0.0.0');

  // Gracefully shutdown the server.
  app.enableShutdownHooks();

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
