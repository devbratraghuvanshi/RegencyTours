import { Router, Request, Response, NextFunction } from 'express';

import { PackageController } from './../controller/packageController';


export class PackageRouter{
    router: Router;
    controller :PackageController;
    constructor(){
        this.controller = new PackageController();
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
export default new PackageRouter().router;