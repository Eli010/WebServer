import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface GetTodosUseCase{
    execute():Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase{
    //*creamos nuestro constructor para la inyeción de dependencias
    constructor(
        private readonly repository:TodoRepository,
    ){}
    execute(): Promise<TodoEntity []> {
        return this.repository.getAll();
    }

}