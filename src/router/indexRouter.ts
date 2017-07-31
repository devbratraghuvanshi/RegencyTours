import {Router, Request, Response, NextFunction} from 'express';
import IndexController from './../controller/IndexController'
import PackageRouter  from './packageRouter';
import SignUpController  from './../controller/signupController';

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
    this.router.use('/api/v1/packages', PackageRouter);
  }

}
// Create the HeroRouter, and export its configured Express.Router
export default new IndexRouter().router;