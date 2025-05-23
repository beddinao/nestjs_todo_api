import {
  Request,
  UseGuards,
  Controller,
  Param,
  Body,
  Put,
  Get,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  get_users(@Request() req) {
    return this.usersService.get_users();
  }

  @Get(':id')
  get_user(@Param('id') id: number, @Request() req) {
    if (id == undefined)
      throw new BadRequestException('need id to select a user');
    return this.usersService.get_user(id);
  }

  @Put('update')
  update_user(
    @Body() body: { username?: string; password?: string; email?: string },
    @Request() req,
  ) {
    if (
      body == undefined ||
      (body.username == undefined &&
        body.email == undefined &&
        body.password == undefined)
    )
      throw new BadRequestException('invalid request');
    return this.usersService.update_user(
      req.user.userId,
      body.username,
      body.password,
      body.email,
    );
  }

  @Delete('delete')
  delete_user(@Request() req) {
    return this.usersService.delete_user(req.user.userId);
  }
}
