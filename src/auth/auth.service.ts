import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async validate_user(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (user && await bcrypt.compare(password, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(email: string, password: string) {
		const user = await this.validate_user(email, password);
		if (!user)
			throw new UnauthorizedException('invalid credientials');
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async register(email: string, password: string) {
		const hashed_password = await bcrypt.hash(password, 10);

		try {
			const user = await this.prisma.user.create({
				data: {
					email: email,
					password: hashed_password,
				}
			});

			const { password: _, ...result } = user;
			return result;
		}
		catch (error) {
			if (error.code === 'P2002')
				throw new UnauthorizedException('email already exists');
			throw error;
		}
	}
}
