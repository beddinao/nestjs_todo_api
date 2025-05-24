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
  get_user(@Param('id') id: string, @Request() req) {
    if (id == undefined)
      throw new BadRequestException('need id to select a user');
    if (!/^\d+$/.test(id))
      throw new BadRequestException('invalid id, only numbers');
    let new_id = parseInt(id);
    if (new_id == undefined || new_id == 0 || isNaN(new_id))
      throw new BadRequestException('invalid user id');
    return this.usersService.get_user(new_id);
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
    if (
      body.username &&
      (typeof body.username != 'string' || !body.username.length)
    )
      throw new BadRequestException('invalid username format');
    if (body.email && (typeof body.email != 'string' || !body.email.length))
      throw new BadRequestException('invalid email format');
    if (
      body.password &&
      (typeof body.password != 'string' || !body.password.length)
    )
      throw new BadRequestException('invalid password format');
    return this.usersService.update_user(
      req.user.userId,
      body.username,
      body.password,
      body.email,
    );
  }

  @Delete('delete')
  delete_user(@Request() req) {
    if (req.user.userId == undefined)
      throw new BadRequestException('invalid user id');
    return this.usersService.delete_user(req.user.userId);
  }
}
