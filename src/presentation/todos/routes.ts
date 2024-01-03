import { Router } from "express";
import { TodosController} from './controllers'


export class TodoRoutes{
    static get routes():Router{
        const router = Router();

        //realizamos la llamada a nuestro controlador
        const todoController = new TodosController();

        //metodos para llamar a todos
        // router.get('/api/all',(req,res)=>todoController.getTodos(req,res));
        router.get('/',todoController.getTodos);//es igual ap codigo del primero



        return router;
    }
}