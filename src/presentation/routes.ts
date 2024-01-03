import { Router } from "express";
import { TodosController } from "./todos/controllers";
import { TodoRoutes } from "./todos/routes";



export class AppRoutes{
    static get routes():Router{
        const router = Router();

        //realizamos la llamada a nuestro controlador
        // const todoController = new TodosController();

        //metodos para llamar a todos
        // router.get('/api/all',(req,res)=>todoController.getTodos(req,res));
        router.use('/api/todos',TodoRoutes.routes);//es igual ap codigo del primero



        return router;
    }
}