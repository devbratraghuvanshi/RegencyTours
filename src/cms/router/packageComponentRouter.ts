import { Router, Request, Response, NextFunction } from 'express';

import { PackageComponentController } from './../controller/packageComponentController';


export class PackageCategoryRouter{
    router: Router;
    controller :PackageComponentController;
    constructor(){
        this.controller = new PackageComponentController();
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
export default new PackageCategoryRouter().router;