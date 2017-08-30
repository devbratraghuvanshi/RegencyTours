import { Router, Request, Response, NextFunction } from 'express';

import { PackagePaymentDetailController } from './../controller/PackagePaymentDetailController';


export class PackagePaymentDetailRouter{
    router: Router;
    controller :PackagePaymentDetailController;
    constructor(){
        this.controller = new PackagePaymentDetailController();
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
export default new PackagePaymentDetailRouter().router;