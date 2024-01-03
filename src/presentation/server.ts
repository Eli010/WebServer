import express, { Router } from 'express';
import path from 'path';

//nos creamos una interface para llamar nuestros varibales de entorno
interface Options{
    port:number,
    routes:Router,
    public_path:string,
}
export class Server{
    private app = express();

    private readonly port:number;
    private readonly publicPath:string;
    private readonly routes:Router //<-- invocamos el Router de nuestro express

    //me creo un constructor
    constructor(options:Options){
        const {port,routes, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    }
    async start(){

        //*Middlewares
        this.app.use(express.json());//<-- para parsear el post|crear|row-json
        this.app.use(express.urlencoded({extended:true}));//<-- x-www-form-urlencoded

        //*Public folder
        // this.app.use(express.static('public'));  //<-- apuntamos a nuestro html
        this.app.use(express.static(this.publicPath));  //<-- apuntamos a nuestro html

        //*Routes
        this.app.use(this.routes);

        //* SPA, para las rutas no encontrados al refresh
        this.app.get('*',(req,res)=>{
            // const indexPath = path.join(__dirname + '../../../public/index.html');
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;

        })

   
        this.app.listen(this.port,()=>{
            console.log(`Server running on port ${3000}`);
            
        })
    }
}