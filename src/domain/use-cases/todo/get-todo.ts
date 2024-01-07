import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetTodoUseCase{
    execute(id:number):Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase{
    //*creamos nuestro constructor para la inyeción de dependencias
    constructor(
        private readonly repository:TodoRepository,
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }

}