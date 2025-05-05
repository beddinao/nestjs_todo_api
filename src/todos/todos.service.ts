import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}

	create(createTodoDto: CreateTodoDto) {
		return 'This action adds a new todo';
	}

	findAll() {
		return 'fuck this stuff';
	}

	findOne(id: number) {
		return `This action returns a #${id} todo`;
	}

	update(id: number, updateTodoDto: UpdateTodoDto) {
		return `This action updates a #${id} todo`;
	}

	remove(id: number) {
		return `This action removes a #${id} todo`;
	}
}
