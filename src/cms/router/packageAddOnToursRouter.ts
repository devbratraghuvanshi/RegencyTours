import { Router, Request, Response, NextFunction } from 'express';

import { PackageAddOnToursController } from './../controller/PackageAddOnToursController';


export class PackageAddOnToursRouter{
    router: Router;
    controller :PackageAddOnToursController;
    constructor(){
        this.controller = new PackageAddOnToursController();
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
export default new PackageAddOnToursRouter().router;