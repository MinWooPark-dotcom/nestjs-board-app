import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsRepository } from './boards.repository';
import BoardsController from './boards.controller';
import { BoardsService } from './boards.service';
import { AuthModule } from 'src/auth/auth.module';

// 모듈은 @Module () 데코레이터로 주석이 달린 클래스입니다.
// @Module () 데코레이터는 Nest가 애플리케이션 구조를 구성하는 데 사용하는 메타 데이터를 제공합니다.
@Module({
  imports: [TypeOrmModule.forFeature([BoardsRepository]), AuthModule],
  controllers: [BoardsController],
  //프로바이더는 Nest의 기본 개념입니다.
  // 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 프로바이더로 취급될 수 있습니다.
  // 프로바이더의 주요 아이디어는 종속성으로 주입할 수 있다는 것입니다.
  // 즉, 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있습니다.
  providers: [BoardsService], // 프로바이더를 사용하기 위해 module파일 providers에 등록해야 함.
})
export class BoardsModule {}
