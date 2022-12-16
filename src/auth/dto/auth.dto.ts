import {
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class authDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.-]+$/,{
    message: "username only contain a-z, A-Z, 0-9, '.', '-' and '_'"
  })
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // At least 1 upper case 1 lower case and 1 number, no white space
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])^[^ ]+$/, 
  {
    message: 'password at least 1 upper case 1 lower case and 1 number',
  })
  password: string;
}
