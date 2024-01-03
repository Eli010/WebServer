import { envs } from "./config/envs";
import { Server } from "./presentation/server";

//with EXPRESS


//función autoinvocado
(async()=>{
    main();
})();

//creamos nuestra función main
function main(){
    // console.log('main');
    //realizamos la llamada de nuestro servidor
    const server = new Server({
        port: envs.PORT,
        public_path:envs.PUBLIC_PATH,
    });
    server.start();
    
}