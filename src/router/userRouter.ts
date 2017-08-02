import { Router, Request, Response, NextFunction } from 'express';

import { UserController } from './../controller/userController';


export class UserRouter{
    router: Router;
    controller :UserController;
    constructor(){
        this.controller = new UserController();
        this.router = Router();
        this.init()
    }

    init() {
    this.router.get('/',this.controller.get);
    this.router.get('/:id',this.controller.getById);
    this.router.put('/', ()=>{});
    this.router.patch('/', ()=>{});
  }

}
export default new UserRouter().router;