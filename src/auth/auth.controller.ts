import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() body: { email: string; password: string }) {
		console.log("\nauth-controller: login");

		if (body == undefined)
			throw new BadRequestException("invalid request body");

		if (!body.email)
			throw new BadRequestException("email is Required");

		if (!body.password)
			throw new BadRequestException("password is required");

		return this.authService.login(body.email, body.password);
	}

	@Post('register')
	register(@Body() body: { email: string; password: string, username: string }) {
		console.log("\nauth-controller: register");

		if (body == undefined) throw new BadRequestException("invalid request body");

		if (!body.email) throw new BadRequestException("email is Required");

		if (!body.password) throw new BadRequestException("password is required");

		if (!body.username) throw new BadRequestException("username is required");
		
		const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email_regex.test(body.email)) throw new BadRequestException("invalid email format");

		if (body.email.length > 40) throw new BadRequestException("email is too long: > 40");

		if (body.password.length < 6) throw new BadRequestException("password is too short: < 6");

		if (body.password.length > 20) throw new BadRequestException("password is too long: > 20");

		if (body.username.length < 3) throw new BadRequestException("username is too short: < 3");

		if (body.username.length > 15) throw new BadRequestException("username is too long: > 15");

		return this.authService.register(body.email, body.password, body.username);
	}
}
