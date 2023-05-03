import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class createSaleOffDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    amount: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    WID: number;

    @Type(() => Date)
    @IsOptional()
    start: Date;

    @Type(() => Date)
    @IsOptional()
    end: Date;
}
