import { Router, Request, Response, NextFunction } from 'express';

import { PackageRemarkController } from './../controller/packageRemarkController';


export class PackageRemarkRouter{
    router: Router;
    controller :PackageRemarkController;
    constructor(){
        this.controller = new PackageRemarkController();
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
export default new PackageRemarkRouter().router;