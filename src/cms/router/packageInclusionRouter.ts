import { Router, Request, Response, NextFunction } from 'express';

import { PackageInclusionController } from './../controller/packageInclusionController';


export class PackageInclusionRouter{
    router: Router;
    controller :PackageInclusionController;
    constructor(){
        this.controller = new PackageInclusionController();
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
export default new PackageInclusionRouter().router;