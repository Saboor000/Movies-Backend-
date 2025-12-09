import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { GetMoviesFilterDto } from './dto/get-movies-filter.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getMovies(@Query() filterDto: GetMoviesFilterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.moviesService.getMovies(filterDto);
  }

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
