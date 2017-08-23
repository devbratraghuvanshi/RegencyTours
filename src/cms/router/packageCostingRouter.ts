import { Router, Request, Response, NextFunction } from 'express';

import { PackageCostingController } from './../controller/packageCostingController';


export class PackageCostingRouter{
    router: Router;
    controller :PackageCostingController;
    constructor(){
        this.controller = new PackageCostingController();
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
export default new PackageCostingRouter().router;