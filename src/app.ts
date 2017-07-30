import * as Express from 'express';
import * as Logger from 'morgan';
import * as BodyParser from 'body-parser';

import indexRouter from './router/indexRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: Express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = Express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(Logger('dev'));
    this.express.use(BodyParser.json());
    this.express.use(BodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/',indexRouter);
  }

}

export default new App().express;
