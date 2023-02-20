import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CommentDto {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    watchId: number;
}
