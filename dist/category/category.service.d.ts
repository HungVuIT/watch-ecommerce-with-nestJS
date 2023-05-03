import { PrismaService } from 'src/prisma/prisma.service';
import { createCategoryDto } from './dto/createCategory.dto';
import { editCategoryDto } from './dto/editCategory.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(CategoryId: number): Promise<import(".prisma/client").Category>;
    getList(): Promise<import(".prisma/client").Category[]>;
    editCategory(categoryId: number, body: editCategoryDto, file: any): Promise<import(".prisma/client").Category>;
    delete(categoryId: number): Promise<import(".prisma/client").Category>;
    createCategory(body: createCategoryDto, file: any): Promise<import(".prisma/client").Category>;
}
