import { IsNotEmpty, IsOptional } from 'class-validator';

export class createSaleOffDto {
    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    WID: number;

    @IsOptional()
    start: Date;

    @IsOptional()
    end: Date;
}
