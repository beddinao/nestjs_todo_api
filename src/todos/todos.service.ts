import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
	constructor(private prisma: PrismaService) {}

	async create_todo(title: string, userId: number) {
		console.log("todos-service: create_todo: title: ", title, ", userId: ", userId);
		return this.prisma.todo.create({
			data: {
				title,
				userId
			}
		});
	}
		
	async get_todos(userId: number) {
		console.log("todos-service: get_todos: user_id: ", userId);
		return this.prisma.todo.findMany({ where: { userId } });
	}

	async get_todo(id: string, userId: number) {
		console.log("todos-service: get_todo: id: ", id, "userId: ", userId);
		const todo = await this.prisma.todo.findFirst({ where: { id, userId } });
		if (!todo)
			throw new NotFoundException('no todo with that id fuck off');
		return todo;
	}

	async update_todo(id: string, title: string|undefined, done: boolean|undefined, userId: number) {
		console.log("todos-service: update_todo: id: ", id, ", title: ", title, ", done: ", done, ", userId: ", userId);
		const todo = await this.prisma.todo.findFirst({ where: { id, userId } });
		if (!todo)
			throw new NotFoundException('no todo with that id fuck off');
		return this.prisma.todo.update({
			where: { id },
			data: {
				title,
				done,
			}
		});
	}

	async delete_todo(id: string, userId: number) {
		console.log("todos--service: delete_todo: id: ", id, ", userId: ", userId);
		const todo = await this.prisma.todo.findFirst({ where: { id, userId } });
		if (!todo)
			throw new NotFoundException('no todo with that id fuck off');
		return this.prisma.todo.delete({
			where: { id },
		});
	}

}
