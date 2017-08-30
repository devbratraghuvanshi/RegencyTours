import { Router, Request, Response, NextFunction } from 'express';

import { PackageVisaRequirementController } from './../controller/PackageVisaRequirementController';


export class PackageVisaRequirementRouter{
    router: Router;
    controller :PackageVisaRequirementController;
    constructor(){
        this.controller = new PackageVisaRequirementController();
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
export default new PackageVisaRequirementRouter().router;