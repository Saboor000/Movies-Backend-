import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { GetMoviesFilterDto } from './dto/get-movies-filter.dto';
import { genreMap } from './genre-map';

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
  async getMovies(filters: GetMoviesFilterDto) {
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
      const { genre, year, rating, page } = filters;
      let url = `${this.tmdbBaseUrl}/discover/movie?api_key=${this.tmdbApiKey}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`;

      if (genre) {
        const genreId = genreMap[genre.toLowerCase()];
        if (!genreId) {
          throw new HttpException(
            `Invalid genre: ${genre}. Use a valid genre name like action, comedy, drama.`,
            HttpStatus.BAD_REQUEST,
          );
        }
        url += `&with_genres=${genreId}`;
      }
      if (year) {
        url += `&primary_release_year=${year}`;
      }
      if (rating) {
        url += `&vote_average.gte=${rating}`;
      }
      if (page) {
        url += `&page=${page}`;
      }

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
}
