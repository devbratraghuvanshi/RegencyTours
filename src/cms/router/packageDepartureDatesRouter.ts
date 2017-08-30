import { Router, Request, Response, NextFunction } from 'express';

import { PackageDepartureDatesController } from './../controller/PackageDepartureDatesController';


export class PackageDepartureDatesRouter{
    router: Router;
    controller :PackageDepartureDatesController;
    constructor(){
        this.controller = new PackageDepartureDatesController();
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
export default new PackageDepartureDatesRouter().router;