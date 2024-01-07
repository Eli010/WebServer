import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

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
        // const todos = await prisma.todo.findMany();
        // return res.json(todos);
        //    return res.json(todos);

        const todos = await this.todoRepository.getAll();
        // console.log(todos);
        return res.json(todos);

        
    }
    //para retornar un valor con id
    public getTodoById = async (req:Request,res:Response)=>{
        const id = + req.params.id;
        //utilizanso nuestro todoRepository
        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({error});
        }
      
    }

    public createTodo = async(req:Request, res:Response)=>{
        //realizamos la llamada a nuestro DTO
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);
        // res.json('POST create todo');
    }

    public updateTodo =async (req:Request, res:Response)=>{
        const id = + req.params.id;
        //mandamos en body, pero no cambiamos el id
        const [error,updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        if(error) return res.status(400).json({error});

        //*usando nuestro repositories
    
        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);
        return res.json(updatedTodo);
        

    }

    public deleteTodo = async(req:Request, res:Response)=>{
        const id = + req.params.id;
        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);
   }

}