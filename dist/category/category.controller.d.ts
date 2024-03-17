/// <reference types="multer" />
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto/createCategory.dto';
import { editCategoryDto } from './dto/editCategory.dto';
export declare class CategoryController {
    private service;
    constructor(service: CategoryService);
    createCategory(body: createCategoryDto, file: Express.Multer.File): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    editCategory(id: number, body: editCategoryDto, file: Express.Multer.File): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    getList(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    delete(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
}
