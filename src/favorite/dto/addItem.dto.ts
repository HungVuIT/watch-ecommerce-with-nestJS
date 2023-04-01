import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class addItemDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    itemId: number;
}
