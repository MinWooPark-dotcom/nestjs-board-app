// 컨트롤러의 목적은 애플리케이션에 대한 특정 요청을 수신하는 것입니다.
// 라우팅 컨트롤러는 어떤 컨트롤러가 어떠한 요청을 받는지에 대해 제어합니다.
// 컨트롤러에 둘 이상의 경로가 있을 수 있으며, 서로 다른 작업을 수행하도록 할 수 있습니다.

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status-enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

// 컨트롤러를 생성하기 위해 클래스와 데코레이터를 사용합니다.
// 데코레이터는 요청을 컨트롤러에 연결하여 Nest가 라우팅 맵을 만들 수 있도록 합니다.
@Controller('boards') // Controller는 인자로 경로를 받음
@UseGuards(AuthGuard())
export default class BoardsController {
  // 핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식 된 컨트롤러 클래스 내의 단순한 메서드입니다.
  // 위와 같은 @Get() Http 요청 메소드 데코레이터는 Nest에 HTTP 요청에 대한 특정 엔드 포인트에 대한 핸들러를 생성하도록 지시합니다.
  // Service에서 정의한 메서드를 가져다 씀
  private logger = new Logger('BoardsController');
  // 접근 제한자 private을 생성자 파라미터안에 선언하면 암묵적으로 클래스 프로퍼티로 선언 됨
  constructor(private boardsService: BoardsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. 
    Payload: ${JSON.stringify(createBoardDto)} `);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
