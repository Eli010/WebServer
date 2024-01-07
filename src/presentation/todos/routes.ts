import { Router } from "express";
import { TodosController} from './controllers'
import { TodoDatasourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImple } from "../../infraestructure/repositories/todo.repository.impl";


export class TodoRoutes{
    static get routes():Router{
        const router = Router();

        //*Usamos nuestro repository
        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImple(datasource);


        //realizamos la llamada a nuestro controlador
        const todoController = new TodosController(todoRepository);

        //metodos para llamar a todos
        // router.get('/api/all',(req,res)=>todoController.getTodos(req,res));
        router.get('/',todoController.getTodos);//es igual ap codigo del primero
        router.get('/:id',todoController.getTodoById);

        //POST
        router.post('/',todoController.createTodo);

        //PUT
        router.put('/:id',todoController.updateTodo);

        //DELETE
        router.delete('/:id',todoController.deleteTodo);



        return router;
    }
}