import { Router, Request, Response, NextFunction } from 'express';

import { PackageTermAndConditionController } from './../controller/packageTermAndConditionController';


export class PackageTermAndConditionRouter{
    router: Router;
    controller :PackageTermAndConditionController;
    constructor(){
        this.controller = new PackageTermAndConditionController();
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
export default new PackageTermAndConditionRouter().router;