import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async get_users() {
    return this.prisma.user.findMany();
  }

  async get_user(id: number) {
    const user = this.prisma.user.findFirst({ where: { id } });

    if (!user)
      throw new NotFoundException('user with id [' + id + '] not found');

    return user;
  }

  async update_user(
    id: number,
    username: string | undefined,
    password: string | undefined,
    email: string | undefined,
  ) {
    if (id == undefined) throw new BadRequestException('invalid request');

    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('no user with that id');

    if (email) {
      const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email_regex.test(email))
        throw new BadRequestException('invalid email');
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        password,
        username,
        email,
      },
    });
  }

  async delete_user(id: number) {
    if (!id) throw new BadRequestException('invalid request');

    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('no user with that id');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
