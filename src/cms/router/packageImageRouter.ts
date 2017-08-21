import { Router, Request, Response, NextFunction } from 'express';

import { PackageImageController } from './../controller/packageImageController';
import { FileUploader } from "../../config/multerConfig";


export class PackageImageRouter {
    router: Router;
    controller :PackageImageController;
    multer = new FileUploader('/images/package').multer.single('PackageImage');
    constructor(){
        this.controller = new PackageImageController();
        this.router = Router();
        this.init()
    }
    init() {
    this.router.route('/')
    .get(this.controller.get)
    .post(this.multer,this.controller.add);

    this.router.route('/:id')
    .get(this.controller.getById)
    .delete(this.controller.delete);

    this.router.route('/GetByPackage/:packageId')
    .get(this.controller.getByPackageId)
    .delete(this.controller.deleteByPackageId);
  }

}
export default new PackageImageRouter().router;