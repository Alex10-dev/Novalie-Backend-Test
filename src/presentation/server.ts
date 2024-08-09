import express, { Router } from "express";

interface ServerOptions {
    PORT: number,
    PUBLIC_PATH?: string,
    ROUTES: Router,
}

export class Server {

    private readonly PORT: number;
    private readonly PUBLIC_PATH?: string;
    private readonly ROUTES: Router;

    private app = express();

    constructor( options: ServerOptions ){
        const {PORT, PUBLIC_PATH, ROUTES} = options;
        this.PORT = PORT;
        this.PUBLIC_PATH = PUBLIC_PATH;
        this.ROUTES = ROUTES;
    }

    async startServer(){

        // this.app.use(express.static('public'));
        
        //Middlewares
        this.app.use( express.json() );

        // Routes
        this.app.use( this.ROUTES );

        this.app.listen(3000, () => {
            console.log(`Server running on PORT: ${ this.PORT }`);
        });
    }
}