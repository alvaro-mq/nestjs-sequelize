import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CatDTO } from './cat.dto';
import { CatsService } from './cats.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiResponse({ status: 200 })
  @Get()
  async getCats(@Res() res: Response) {
    const cats = await this.catsService.getCats();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'List cats succesfull.',
      data: cats,
    });
  }

  @ApiResponse({ status: 201 })
  @Post()
  async newCat(@Res() res, @Body() cat: CatDTO) {
    const newCat = await this.catsService.addCat(cat);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Cat created succesfull.',
      data: newCat,
    });
  }
}
