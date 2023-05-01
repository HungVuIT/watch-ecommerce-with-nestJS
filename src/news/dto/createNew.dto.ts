import { IsNotEmpty, IsOptional } from 'class-validator';

export class createNewDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;

}
