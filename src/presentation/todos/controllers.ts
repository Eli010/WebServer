import { Request, Response } from "express"
import { prisma } from "../../data/postgres";

// const todos = [
//     {id:1,text:'Buy milk', completedAt: new Date()},
//     {id:2,text:'Buy bread', completedAt: null},
//     {id:3,text:'Buy butter', completedAt: new Date()},
// ]

export class TodosController{
    //* inyección de dependencias DI

    constructor(){}

    //para retornar todo los valores
    public getTodos = async(req:Request,res:Response)=>{
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    //    return res.json(todos);
    }
    //para retornar un valor con id
    public getTodoById = async (req:Request,res:Response)=>{
        const id = + req.params.id;
        if (isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});
        // console.log(id,10);
        // res.json({id});
        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        });
        // res.json(todo);
        (todo)
        ?res.json(todo)
        :res.status(404).json({error: `TODO with id ${id} not found`})
    }

    public createTodo = async(req:Request, res:Response)=>{
        const {text} = req.body;
        // const body = req.body;
        //si no hay text
        if (!text) return res.status(400).json({error:'Text property is required'});

        //creamos nuestr base de datos
        const todo = await prisma.todo.create({
            data:{
                text:text
            }
        })
        //mis datos
        // const newTodo = {
        //     id:todos.length + 1,
        //     text: text,
        //     completedAt: null
        // };
        // todos.push(newTodo);
        // res.json(newTodo);
        res.json(todo);
        // res.json('POST create todo');
    }

    public updateTodo =async (req:Request, res:Response)=>{
        const id = + req.params.id;
        if ( isNaN(id)) return res.status(400).json({error:'ID argument is not a number'});

        //si no existe un TODO
        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        });
        if (!todo) return res.status(404).json({error:`Todo with id ${id} not found`}); 

        //si el texto no viene
        const {text,completedAt} = req.body;
        // if (!text) return res.status(400).json({error:'Text property is required'});
        
        const updateTodo = await prisma.todo.update({
            where:{
                id:id,
            },
            data:{
                text:text,
                // completedAt:completedAt
                completedAt:(completedAt)? new Date(completedAt):null
            }
        });
        // todo.text = text || todo.text;
        // (completedAt === 'null')
        // ? todo.completedAt = null
        // : todo.completedAt = new Date(completedAt || todo.completedAt);

        
        // todo.text = text;
        //!OJO, referencia

        // todos.forEach((todo, index)=>{
        //     if (todo.id === id) {
        //         todos[index] = todo;
        //     }
        // });
        res.json(updateTodo);
    }

    public deleteTodo = async(req:Request, res:Response)=>{
        const id = + req.params.id;

        // const todo = todos.find(todo => todo.id === id);
        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        });
        if (!todo) return res.status(404).json({error:`Todo with id ${id} not found`});

        // todos.splice(todos.indexOf(todo),1);
        const deleteTodo = await prisma.todo.delete({
            where:{
                id:id
            }
        });
        //cuando se repite la eliminación, enviamos el status
        (deleteTodo)
        ? res.json(deleteTodo) 
        :res.status(400).json({error:`Todo with ${id} not found`})
        // res.json({todo,deleteTodo});
    }

}