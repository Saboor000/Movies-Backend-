import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReview(
    @Body() body: { movieId: string; comment: string; rating: number },
    @Req() req: Request,
  ) {
    const userId = (req.user as { id: number }).id;
    return this.reviewsService.createReview(
      userId,
      body.movieId,
      body.comment,
      body.rating,
    );
  }

  @Get()
  async getReviews(@Query('movieId') movieId: string) {
    return this.reviewsService.getReviews(movieId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { comment?: string; rating?: number },
    @Req() req: Request,
  ) {
    const userId = (req.user as { id: number }).id;
    return this.reviewsService.update(+id, userId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { id: number }).id;
    return this.reviewsService.remove(+id, userId);
  }
}
