import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface CreateTodoUseCase{
    execute(dto:CreateTodoDto):Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase{
    //*creamos nuestro constructor para la inyeción de dependencias
    constructor(
        private readonly repository:TodoRepository,
    ){}
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto);
    }

}