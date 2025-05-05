import { Controller, Body, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() body: { email: string; password: string }) {

		if (body == undefined)
			throw new BadRequestException("invalid request body");
		if (!body.email || !body.password)
			throw new BadRequestException("email and password are Required");

		return this.authService.login(body.email, body.password);
	}

	@Post('register')
	async register(@Body() body: { email: string; password: string, username: string }) {

		if (body == undefined)
			throw new BadRequestException("invalid request body");
		if (!body.email || !body.password || !body.username) 
			throw new BadRequestException("email & password & username are Required");

		const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email_regex.test(body.email) || body.email.length > 40)
			throw new BadRequestException("invalid email format, eg: name@domain.com");
		if (body.password.length < 6 || body.password.length > 20)
			throw new BadRequestException("invalid password, must be > 6 & < 20");
		if (body.username.length < 3 || body.password.length > 15)
			throw new BadRequestException("invalid username, must be > 3 & < 15");

		return this.authService.register(body.email, body.password, body.username);
	}

	@Post('refresh')
	async refresh(@Body() body: { refresh_token: string }) {

		if (body == undefined)
			throw new BadRequestException("invalid request body");
		if (!body.refresh_token)
			throw new BadRequestException("no refresh token given");

		return this.authService.refresh_token(body.refresh_token);
	}
}
