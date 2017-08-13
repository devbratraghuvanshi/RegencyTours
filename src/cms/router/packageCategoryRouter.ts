import { Router, Request, Response, NextFunction } from 'express';

import { PackageCategoryController } from './../controller/PackageCategoryController';


export class PackageCategoryRouter{
    router: Router;
    controller :PackageCategoryController;
    constructor(){
        this.controller = new PackageCategoryController();
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

    this.router.route('/search/:searchStr')
    .get(this.controller.search)
  }

}
export default new PackageCategoryRouter().router;