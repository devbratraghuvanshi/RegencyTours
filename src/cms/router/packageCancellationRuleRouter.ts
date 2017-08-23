import { Router, Request, Response, NextFunction } from 'express';

import { PackageCancellationRuleController } from './../controller/PackageCancellationRuleController';


export class PackageCancellationRuleRouter{
    router: Router;
    controller :PackageCancellationRuleController;
    constructor(){
        this.controller = new PackageCancellationRuleController();
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
export default new PackageCancellationRuleRouter().router;