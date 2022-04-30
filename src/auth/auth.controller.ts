import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

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
}
