import { Router, Request, Response, NextFunction } from 'express';

import { PackageFlightDetailController } from './../controller/PackageFlightDetailController';


export class PackageFlightDetailRouter{
    router: Router;
    controller :PackageFlightDetailController;
    constructor(){
        this.controller = new PackageFlightDetailController();
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
export default new PackageFlightDetailRouter().router;