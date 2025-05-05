import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	UseGuards,
	Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
	constructor(private todosService: TodosService) {}

	@Post()
	createTodo(@Body() body: { title: string }, @Request() req) {
		return this.todosService.create_todo(body.title, req.user.userId);
	}

	@Get()
	getTodos(@Request() req) {
		return this.todosService.get_todos(req.user.userId);
	}

	@Get(':id')
	getTodo(@Param('id') id: string, @Request() req) {
		return this.todosService.get_todo(id, req.user.userId);
	}

	@Put(':id')
	updateTodo(@Param('id') id: string,
		@Body() body: { title?: string; done?: boolean },
		@Request() req)
	{
			return this.todosService.update_todo(
				id,
				body.title,
				body.done,
				req.user.userId,
			);
	}

	@Delete(':id')
	deleteTodo(@Param('id') id: string, @Request() req) {
		return this.todosService.delete_todo(id, req.user.userId);
	}

}
