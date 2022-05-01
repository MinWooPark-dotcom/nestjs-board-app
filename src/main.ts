// main.ts: 핵심 기능 NestFactory를 사용해 Nest 애플리케이션 인스턴스를 작성하는 애플리케이션의 엔트리 파일
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
