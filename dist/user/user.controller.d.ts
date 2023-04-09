/// <reference types="multer" />
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getMe(user: any): any;
    getUserById(id: number): Promise<import(".prisma/client").User>;
    getList(query: any): Promise<import(".prisma/client").User[]>;
    editMe(id: number, body: userDto, file: Express.Multer.File): Promise<import(".prisma/client").User>;
    editUser(id: number, body: userDto, file: Express.Multer.File): Promise<import(".prisma/client").User>;
    delete(id: any): Promise<void>;
}
