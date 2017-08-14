import { Router, Request, Response, NextFunction } from 'express';

import { FactCategoryController } from './../controller/FactCategoryController';


export class FactCategoryRouter{
    router: Router;
    controller :FactCategoryController;
    constructor(){
        this.controller = new FactCategoryController();
        this.router = Router();
        this.init()
    }

    init() {
    this.router.route('/')
    .get(this.controller.get)
    .post(this.controller.add);

    this.router.route('/:id')
    .get(this.controller.getById)
    .put(this.controller.update)
    .patch(this.controller.patch)
    .delete(this.controller.delete);

    this.router.route('/search/:searchStr')
    .get(this.controller.search)
  }

}
export default new FactCategoryRouter().router;