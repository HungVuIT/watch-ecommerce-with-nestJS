import { HttpService } from '@nestjs/axios';
import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard } from 'src/shared/guard';
import { RatingService } from './rating.service';

class rateBody{
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    targetID: number

    @IsNotEmpty()
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    @IsIn([1,2,3,4,5])
    score: number
}

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService){}

    @UseGuards(jwtGuard)
    @Post('shop')
    rateShop(@User('id') userID: number, @Body() body:rateBody){
        this.ratingService.rateShop(userID, body.targetID, body.score)
        return HttpStatus.OK
    }

    @UseGuards(jwtGuard)
    @Patch('shop')
    updateRateShop(@User('id') userID: number, @Body() body:rateBody){
        this.ratingService.updateRateShop(userID, body.targetID, body.score)
        return HttpStatus.OK
    }

    @Get('shop/:id')
    getRateShop(@Param('id', ParseIntPipe) id: number){
        this.ratingService.getShopRate(id)
        return HttpStatus.OK
    }

    @UseGuards(jwtGuard)
    @Post('watch')
    rateWatch(@User('id') userID: number, @Body() body:rateBody){
        this.ratingService.rateShop(userID, body.targetID, body.score)
        return HttpStatus.OK
    }

    @UseGuards(jwtGuard)
    @Patch('watch')
    updateRateWatch(@User('id') userID: number, @Body() body:rateBody){
        this.ratingService.updateRateShop(userID, body.targetID, body.score)
        return HttpStatus.OK
    }

    @Get('watch/:id')
    getRateWatch(@Param('id', ParseIntPipe) id: number){
        this.ratingService.getShopRate(id)
        return HttpStatus.OK
    }
    
}
