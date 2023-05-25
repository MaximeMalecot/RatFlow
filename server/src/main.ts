import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
      if (process.env.NODE_ENV !== "prod") {
        const config = new DocumentBuilder()
            .setTitle(process.env.npm_package_name ?? "API")
            .setDescription(
                process.env.npm_package_description ?? "The API description"
            )
            .setVersion(process.env.npm_package_version)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("api", app, document);
    }
  await app.listen(3000);
}
bootstrap();
