import { Router, Request, Response, NextFunction } from 'express';

import { PackageDestinationController } from './../controller/packageDestinationController';


export class PackageDestinationRouter{
    router: Router;
    controller :PackageDestinationController;
    constructor(){
        this.controller = new PackageDestinationController();
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

  }

}
export default new PackageDestinationRouter().router;