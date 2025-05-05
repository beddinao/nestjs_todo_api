import {
	Request,
	UseGuards,
	Controller,
	Body,
	Put,
	Delete,
	BadRequestException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Put()
	update_user(@Body() body: { username?: string; password?: string; email?: string }, @Request() req) {
		console.log("Users-controller: put(id): update_user: id: ", req.user.userId);
		return this.usersService.update_user(req.user.userId, body.username, body.password, body.email);
	}

	@Delete()
	delete_user(@Request() req) {
		console.log("Users-controller: delete(id): delete_user: id: ", req.user.userId);
		return this.usersService.delete_user(req.user.userId);
	}
}
