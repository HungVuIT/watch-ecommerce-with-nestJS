import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
import { FavoriteService } from './favorite.service';
import { addItemDto } from './dto/addItem.dto';


@Controller('favorite')
@UseInterceptors(FileInterceptor(''))
@UseInterceptors(TransResInterceptor)
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) {}

    @UseGuards(jwtGuard)
    @Post('item')
    addItem(@User('id') userId: number, @Body() body: addItemDto) {
        return this.favoriteService.addItem(userId, body);
    }

    @UseGuards(jwtGuard)
    @Delete('item/:favoriteId')
    removeItem(@Param('favoriteId', ParseIntPipe) id: number) {
        return this.favoriteService.deleteItem(id);
    }

    @UseGuards(jwtGuard)
    @Get('')
    getFavorite(@User('id') userId: number) {
        return this.favoriteService.getList(userId);
    }
}
