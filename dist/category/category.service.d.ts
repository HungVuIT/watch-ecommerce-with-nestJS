import { PrismaService } from 'src/prisma/prisma.service';
import { createCategoryDto } from './dto/createCategory.dto';
import { editCategoryDto } from './dto/editCategory.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(CategoryId: number): Promise<import("@prisma/client/runtime").GetResult<{
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
    editCategory(categoryId: number, body: editCategoryDto, file: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    delete(categoryId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    createCategory(body: createCategoryDto, file: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
}
