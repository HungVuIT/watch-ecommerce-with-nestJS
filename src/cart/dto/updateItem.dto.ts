import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class updateItemDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    cartId: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    quantity: number;
}
