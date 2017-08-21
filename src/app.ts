import * as Express from 'express';
import * as Logger from 'morgan';
import * as BodyParser from 'body-parser';
import * as passport from 'passport';
import * as Mongoose from "mongoose";

import { DB } from "./dbConfig/db"
import indexRouter from './router/indexRouter';
import passportAuth from './auth/Passport'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: Express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = Express();
    this.middleware();
    this.routes();
    this.initDb();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(Logger('dev'));
    this.express.use(BodyParser.json({limit:'50mb'}));
    this.express.use(BodyParser.urlencoded({ extended: true,limit:'50mb' }));
    this.express.use(passportAuth.initialize());
    this.express.use(this.allowCORS);
    this.express.use('/images', Express.static(__dirname + '/images'));
    this.express.use(this.clientErrorHandler); // You define error-handling middleware last, after other app.use() 
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/', indexRouter);
  }
  // Configure API endpoints.
  private initDb(): void {
    var db = new DB(Mongoose);
  }
  private clientErrorHandler(err, req, res, next): void {
    if (err) {
      res.status(500).send({ message: 'Omg! looks like Something went wrong bro !', error: err });
    } else {
      next();
    }
  }
    private allowCORS (req, res, next): void {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  }
}

export default new App().express;
