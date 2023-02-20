import { IsOptional } from 'class-validator';

export class editBrandDto {
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    image: any;
}
