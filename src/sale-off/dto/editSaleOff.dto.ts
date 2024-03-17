import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class editSaleOffDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    amount: number;

    @IsNotEmpty()
    PID: number;

    @Type(() => Date)
    @IsOptional()
    start: Date;

    @Type(() => Date)
    @IsOptional()
    end: Date;
}
