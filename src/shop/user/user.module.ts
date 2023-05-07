import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {
    constructor(private prisma: PrismaService) {}
}
