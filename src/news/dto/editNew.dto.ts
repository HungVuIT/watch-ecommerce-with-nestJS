import { IsNotEmpty, IsOptional } from 'class-validator';

export class editNewDto {
    @IsOptional()
    title: string;

    @IsOptional()
    content: string;

}
