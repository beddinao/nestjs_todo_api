import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async update_user(id: number, username: string|undefined, password: string|undefined, email: string|undefined) {

		console.log("users-service: update_user:");

		if (id == undefined)
			throw new BadRequestException('invalid request');

		const user = await this.prisma.user.findFirst({ where: { id } });
		
		if (!user)
			throw new NotFoundException("no user with that id");

		if (email) {
			const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email_regex.test(email))
				throw new BadRequestException("invalid email");
		}

		return this.prisma.user.update({
			where: { id },
			data: {
				password,
				username,
				email
			}
		});
	}


	async delete_user(id: number) {
		console.log("users-service: delete_user: id: ", id);
		if (!id) 
			throw new BadRequestException("invalid request");

		const user = await this.prisma.user.findFirst({ where: { id } });

		if (!user)
			throw new NotFoundException("no user with that id");

		return this.prisma.user.delete({
			where: { id },
		});
	}

}
