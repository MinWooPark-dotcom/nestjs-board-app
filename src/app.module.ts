// 애플리케이션의 루트(root) 모듈
import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';

// @ 데코레이터는 클래스에 함수 기능을 추가한다.
@Module({
  imports: [BoardsModule],
  })
export class AppModule {}
