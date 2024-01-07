import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { error } from "console";

// const todos = [
//     {id:1,text:'Buy milk', completedAt: new Date()},
//     {id:2,text:'Buy bread', completedAt: null},
//     {id:3,text:'Buy butter', completedAt: new Date()},
// ]

export class TodosController{
    //* inyección de dependencias DI

    constructor(
        //*usamos nuestro repository
        private readonly todoRepository:TodoRepository,
    ){}

    //para retornar todo los valores
    public getTodos = async(req:Request,res:Response)=>{
        
        new GetTodos(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error=> res.status(400).json({error}));
    }
    //para retornar un valor con id
    public getTodoById = async (req:Request,res:Response)=>{
        const id = + req.params.id;

        new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}))
        //utilizanso nuestro todoRepository
        // try {
        //     const todo = await this.todoRepository.findById(id);
        //     res.json(todo);
        // } catch (error) {
        //     res.status(400).json({error});
        // }
      
    }

    public createTodo = async(req:Request, res:Response)=>{
        //realizamos la llamada a nuestro DTO
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});

        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));

        // const todo = await this.todoRepository.create(createTodoDto!);
        // res.json(todo);
        // res.json('POST create todo');
    }

    public updateTodo =async (req:Request, res:Response)=>{
        const id = + req.params.id;
        //mandamos en body, pero no cambiamos el id
        const [error,updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        if(error) return res.status(400).json({error});
        //*usando use case
        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({error}));

        //*usando nuestro repositories
        // const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
        // return res.json(updatedTodo);
        

    }

    public deleteTodo = async(req:Request, res:Response)=>{
        const id = + req.params.id;

        //*with use case
        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then(todo => res.json(todo))
        .catch(error =>res.status(400).json({error}));
        //*repository
        // const deletedTodo = await this.todoRepository.deleteById(id);
        // res.json(deletedTodo);
   }

}