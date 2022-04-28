import { IsNotEmpty } from 'class-validator';

// It is possible using Class and Interface
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
