import { Router, Request, Response, NextFunction } from 'express';

import { PackageExclusionController } from './../controller/packageExclusionController';


export class PackageExclusionRouter{
    router: Router;
    controller :PackageExclusionController;
    constructor(){
        this.controller = new PackageExclusionController();
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
export default new PackageExclusionRouter().router;