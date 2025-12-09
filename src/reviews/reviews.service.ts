import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  async createReview(
    userId: number,
    movieId: string,
    comment: string,
    rating: number,
  ) {
    const review = this.reviewRepo.create({
      movieId,
      comment,
      rating,
      user: { id: userId },
    });
    return this.reviewRepo.save(review);
  }

  async getReviews(movieId: string) {
    return this.reviewRepo.find({ where: { movieId }, relations: ['user'] });
  }

  async findOne(id: number) {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async update(
    id: number,
    userId: number,
    data: { comment?: string; rating?: number },
  ) {
    const review = await this.findOne(id);
    if (review.user.id !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }
    await this.reviewRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number, userId: number) {
    const review = await this.findOne(id);
    if (review.user.id !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }
    await this.reviewRepo.delete(id);
    return { deleted: true, id };
  }
}
