
import {Router, Request, Response, NextFunction} from 'express';
import * as Passport from 'passport'

import IndexController from './../controller/IndexController'
import SignUpController  from './../controller/signupController';

import  PackageRouter   from './packageRouter';
import  UserRouter  from './userRouter';

export class IndexRouter {
  router: Router

  /**
   * Initialize the indexRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', IndexController.get);
    this.router.post('/signup',new SignUpController().signUpUser);
    this.router.post('/authenticate',new SignUpController().authenticate);
  //  this.router.get('/memberinfo', Passport.authenticate('jwt', { session: false}),new SignUpController().memberInfo);
    this.router.use('/api/v1/packages', PackageRouter);
    this.router.use('/api/v1/user',Passport.authenticate('jwt', { session: false}), UserRouter);
  }

}
// Create the HeroRouter, and export its configured Express.Router
export default new IndexRouter().router;