import { IsNotEmpty, IsOptional } from 'class-validator';

export class editSaleOffDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    WID: number;

    @IsOptional()
    start: Date;

    @IsOptional()
    end: Date;
}
