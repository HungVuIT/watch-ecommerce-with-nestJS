/// <reference types="multer" />
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto/createCategory.dto';
import { editCategoryDto } from './dto/editCategory.dto';
export declare class CategoryController {
    private service;
    constructor(service: CategoryService);
    createCategory(body: createCategoryDto, file: Express.Multer.File): Promise<import(".prisma/client").Category>;
    editCategory(id: number, body: editCategoryDto, file: Express.Multer.File): Promise<import(".prisma/client").Category>;
    getList(): Promise<import(".prisma/client").Category[]>;
    getById(id: number): Promise<import(".prisma/client").Category>;
    delete(id: number): Promise<import(".prisma/client").Category>;
}
