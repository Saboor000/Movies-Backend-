import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('search')
  async search(@Query('query') query: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.moviesService.searchMovies(query);
  }

  @Get(':id')
  async details(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.moviesService.getMovieDetails(id);
  }
}
