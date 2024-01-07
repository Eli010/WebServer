import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDatasourceImpl implements TodoDatasource{
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data:createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }
    //con la validación y conversión desde nuestra entity
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo=> TodoEntity.fromObject(todo));
    }
    //aquí también podemos realizar una validación
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        });
        //si no encontramos el id
        if(!todo) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        //reutilizamos en codigo del findById
        await this.findById(updateTodoDto.id);
        //y actualizamos 
        const updatedTodo = await prisma.todo.update({
            where:{
                id:updateTodoDto.id,
            },
            data:updateTodoDto!.values  
        });

        return TodoEntity.fromObject(updatedTodo);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleted = await prisma.todo.delete({
            where:{
                id:id
            }
        });
        return TodoEntity.fromObject(deleted);
    }
    
}