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
    this.router.route('/')
    .get(this.controller.get)
    .post(this.controller.add)
    delete(this.controller.delete);

    this.router.route('/:id')
    .get(this.controller.getById)
    .put(this.controller.update)
    .patch(this.controller.patch);
  }

}
export default new UserRouter().router;