import { Router, Request, Response, NextFunction } from 'express';

import { PackageHotelController } from './../controller/packageHotelController';


export class PackageHotelRouter{
    router: Router;
    controller :PackageHotelController;
    constructor(){
        this.controller = new PackageHotelController();
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
export default new PackageHotelRouter().router;