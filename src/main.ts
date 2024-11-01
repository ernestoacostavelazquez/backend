import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("API's SGE")
    .setDescription("API's de los diferentes Modulos del sistema SGE")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4209', // Permitir solo tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o autenticación
  });

  await app.listen(3000);
}
bootstrap();
