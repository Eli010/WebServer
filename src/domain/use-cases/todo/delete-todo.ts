import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface DeleteTodoUseCase{
    execute(id:number):Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase{
    //*creamos nuestro constructor para la inyeción de dependencias
    constructor(
        private readonly repository:TodoRepository,
    ){}
    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }

}