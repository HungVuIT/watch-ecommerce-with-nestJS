import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class createSaleOffDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    amount: number;

    @IsNotEmpty()
    WID: number;

    @IsOptional()
    start: Date;

    @IsOptional()
    end: Date;
}
