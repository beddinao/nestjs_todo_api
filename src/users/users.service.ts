import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async find_by_email(email: string) {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async find_by_id(id: number) {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async create_user(email: string, password: string) {
		const hashed_password = await bcrypt.hash(password, 10);
		return this.prisma.user.create({
			data: { email, password: hashed_password }
		});
	}
}
