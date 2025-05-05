import {
	Request,
	UseGuards,
	Controller,
	Param,
	Body,
	Put,
	Get,
	Delete,
	BadRequestException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	get_users(@Request() req) {
		console.log("Users-controller: get: get_users");
		return this.usersService.get_users();
	}

	@Get(':id')
	get_user(@Param('id') id: number, @Request() req) {
		console.log("Users-controller: get(id): get_user: id: ", id);
		return this.usersService.get_user(id);
	}

	@Put('update')
	update_user(@Body() body: { username?: string; password?: string; email?: string }, @Request() req) {
		console.log("Users-controller: put(id): update_user: id: ", req.user.userId);
		return this.usersService.update_user(req.user.userId, body.username, body.password, body.email);
	}

	@Delete('delete')
	delete_user(@Request() req) {
		console.log("Users-controller: delete(id): delete_user: id: ", req.user.userId);
		return this.usersService.delete_user(req.user.userId);
	}
}
