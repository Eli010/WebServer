import express from 'express';


export class Server{
    private app = express();
    async start(){

        //*Middlewares

        //*Public folder
        this.app.use(express.static('public'));  //<-- apuntamos a nuestro html



        // console.log('Server running');
        this.app.listen(3000,()=>{
            console.log(`Server running on por ${3000}`);
            
        })
    }
}