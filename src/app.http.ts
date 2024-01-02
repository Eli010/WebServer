import fs from 'fs';
import http from 'http';

const server = http.createServer((req,res)=>{
    console.log(req.url);
    //realizamos una llamada con nuestro servidor mostrando un html
    // res.writeHead(200,{'Content-Type':'text/html'});
    // res.write(`<h1> URL ${req.url} </h1>`);
    // res.end();

    //consumiendo datos
    // const data = {name:'Lee Santander',age:'30', city:'New York'};
    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.end(JSON.stringify(data));

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(htmlFile);
        return;
    }
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, {'Content-Type':'application/javascript'});
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200,{'Content-Type':'text/css'});
    }
    
    const responseContent = fs.readFileSync(`./public${req.url}`,'utf-8');
    res.end(responseContent);
    // else{
    //     res.writeHead(404,{'Content-Type':'text/html'})
    //     res.end();
    // }
});

server.listen(8080,()=>{
    console.log('Server running on port 8080');
    
});
