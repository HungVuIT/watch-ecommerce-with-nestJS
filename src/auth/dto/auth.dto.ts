import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class authDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_.-]+$/, {
        message: 'tài khoản chỉ bao gồm các kí tự chữ thường, chữ hoa, số, gạch ngang, gạch chân và dấu chấm',
    })
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // At least 1 upper case 1 lower case and 1 number, no white space
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])^[^ ]+$/, {
        message: 'mật khẩu cần tối thiểu 1 chữ thường, 1 chữ hoa, 1 chữ số',
    })
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}
