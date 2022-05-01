import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // /auth/signup
  @Post('/signup')
  signUP(
    @Body(ValidationPipe) authcredentialDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authcredentialDto);
  }

  @Post('/signin')
  siginIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('🚀 ~ file: auth.controller.ts ~ line 34 ~ AuthController ~ test ~ user', user)
  }
}
