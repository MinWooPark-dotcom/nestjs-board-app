import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status-enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable() // 다른 컴포넌트에서 이 service릂 사용할 수 있게(Injectable) 만들어 줌
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)
    private boardsRespository: BoardsRepository,
  ) {}
  // 서비스는 소프트웨어 개발내의 공통 개념이며, NestJS, Javascript에서만 쓰이는 개념이 아닙니다.
  // @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용 될 수 있다.
  // 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을 처리합니다
  // 서비스에서 만든 메서드는 컨트롤러에서 가져다 씀
  // 실제 비즈니스 로직은 service에서 작성

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardsRespository.createBoard(createBoardDto, user);
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRespository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardsRespository.findOne({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardsRespository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find a Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardsRespository.save(board);

    return board;
  }
}
