import {Router, Request, Response, NextFunction} from 'express';
import {PackageController} from './../controller/packageController'
const ctrl = new PackageController(); // FOR IOC

export class PackageRouter {
  router: Router
  controller: PackageController;

  constructor() {
    this.controller = ctrl;
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/', this.controller.get);
    this.router.get('/AddToDB', this.controller.AddToDB);// this is to add the data in mongo db
    this.router.get('/:id', this.controller.getById);
  }
}

export default new PackageRouter().router;