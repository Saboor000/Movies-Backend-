import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './user/entities/user.entity';
import { Review } from './reviews/entities/review.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'movie_db',
      entities: [User, Review],
      synchronize: true, // set false in production
    }),
    UserModule,
    AuthModule,
    MoviesModule,
    ReviewsModule,
  ],
})
export class AppModule {}
