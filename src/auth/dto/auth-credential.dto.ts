import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // Check a validation that is available in English and Number.
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Passwords can only be English and numeric.',
  })
  password: string;
}
