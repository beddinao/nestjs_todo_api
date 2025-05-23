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
  BadRequestException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@Request() req) {
    return this.todosService.get_todos(req.user.userId);
  }

  @Post()
  createTodo(@Body() body: { title: string }, @Request() req) {
    if (body == undefined || body.title == undefined)
      throw new BadRequestException('need title to create a todo');
    return this.todosService.create_todo(body.title, req.user.userId);
  }

  @Get(':id')
  getTodo(@Param('id') id: string, @Request() req) {
    if (id == undefined)
      throw new BadRequestException('need id to retrieve a todo');
    return this.todosService.get_todo(id, req.user.userId);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() body: { title?: string; done?: boolean },
    @Request() req,
  ) {
    if (
      id == undefined ||
      body == undefined ||
      (body.done == undefined && body.title == undefined)
    )
      throw new BadRequestException('invalid post request');
    return this.todosService.update_todo(
      id,
      body.title,
      body.done,
      req.user.userId,
    );
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Request() req) {
    if (id == undefined)
      throw new BadRequestException('need id to select a todo to delete');
    return this.todosService.delete_todo(id, req.user.userId);
  }
}
