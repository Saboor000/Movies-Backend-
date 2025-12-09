import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private tmdbApiKey = process.env.TMDB_API_KEY;
  private tmdbBaseUrl = 'https://api.themoviedb.org/3';

  async searchMovies(query: string) {
    // Check if API key is configured
    if (!this.tmdbApiKey || this.tmdbApiKey === 'your_tmdb_api_key_here') {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message:
            'TMDB API key is not configured. Please add a valid TMDB_API_KEY to your .env file.',
          error: 'Service Unavailable',
          instructions:
            'Get your API key from https://www.themoviedb.org/settings/api',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    if (!query) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Query parameter is required',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const url = `${this.tmdbBaseUrl}/search/movie?api_key=${this.tmdbApiKey}&query=${query}`;
      const response = await axios.get(url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return response.data.results;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Failed to fetch movies from TMDB API',
          error: errorMessage,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getMovieDetails(id: string) {
    // Check if API key is configured
    if (!this.tmdbApiKey || this.tmdbApiKey === 'your_tmdb_api_key_here') {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message:
            'TMDB API key is not configured. Please add a valid TMDB_API_KEY to your .env file.',
          error: 'Service Unavailable',
          instructions:
            'Get your API key from https://www.themoviedb.org/settings/api',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    try {
      const url = `${this.tmdbBaseUrl}/movie/${id}?api_key=${this.tmdbApiKey}`;
      const response = await axios.get(url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_GATEWAY,
          message: 'Failed to fetch movie details from TMDB API',
          error: errorMessage,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
