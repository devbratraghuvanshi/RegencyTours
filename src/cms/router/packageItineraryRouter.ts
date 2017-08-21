import { Router, Request, Response, NextFunction } from 'express';

import { PackageItineraryController } from './../controller/packageItineraryController';


export class PackageItineraryRouter{
    router: Router;
    controller :PackageItineraryController;
    constructor(){
        this.controller = new PackageItineraryController();
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
export default new PackageItineraryRouter().router;