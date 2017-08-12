import * as Http from 'http';
import * as Debug from 'debug';
Debug('ts-express:server');

import App from './app';


const Server = Http.createServer(App);

class HttpServer {
public Port:any;
    constructor() {
        this.Port = this.normalizePort(process.env.PORT || 3000);
         Server.listen(this.Port);
         Server.on('error', this.onError);
         Server.on('listening', this.onListening);
          Server.on('uncaughtException', this.onUnCaughtException);
    }

    normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof this.Port === 'string') ? 'Pipe ' + this.Port : 'Port ' + this.Port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    onListening(): void {
        let addr = Server.address()
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        Debug(`Listening on ${bind}`);
    }
    onUnCaughtException(err:any): void {
            console.log( "UNCAUGHT EXCEPTION " );
            console.log( "[Inside 'uncaughtException' event] " + err.stack || err.message );
    }

}

//initiate the server
new HttpServer();





