import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('test')
export class TestController {
  @Get('public')
  publicRoute() {
    return { message: 'This is a public route - no auth needed' };
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protectedRoute(@CurrentUser() user: User) {
    return {
      message: 'Authentication successful!',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
