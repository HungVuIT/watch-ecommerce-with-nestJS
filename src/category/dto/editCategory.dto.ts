import { IsOptional } from 'class-validator';

export class editCategoryDto {
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    image: any;
}
