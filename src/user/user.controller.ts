import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { fileUpload } from 'src/shared/cloudinary/storage';
import { User } from 'src/shared/customDecorator/user.decorator';
import { AdminGuard, jwtGuard } from 'src/shared/guard';
import { AddressPipe } from '../shared/pipe/addressValidation.pipe';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(jwtGuard)
  @Get('me')
  getMe(@User() user) {
    delete user['password'];
    return user;
  }

  @UseGuards(jwtGuard)
  @Get('id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @UseGuards(jwtGuard)
  @Get('list')
  getList(@Query() query) {
    return this.userService.getList(query);
  }

  @UseGuards(jwtGuard)
  @Patch('me')
  @UseInterceptors(fileUpload('avatar'))
  editMe(
    @User('id') id: number,
    @Body(new AddressPipe()) body: userDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.editMe(id, body, file);
  }

  @UseGuards(jwtGuard, AdminGuard)
  @Delete('id/:id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
