import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(+process.env.PORT);
  console.log('App is on port', process.env.PORT);
  console.log('api/v1');
}
bootstrap();
