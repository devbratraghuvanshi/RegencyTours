import { Router } from 'express';
import { ImageController } from './../controller/ImageController';
import { mulUpload } from './../config/multerConfig';

export class ImageRouter{
    router: Router;
    controller: ImageController;

    constructor(){
        // initialize the router
        this.router = Router();
        // initialize the controller
        this.controller = new ImageController();
        // register the all the route for images
        this.init();
    }

    init(){
        this.router.route('/holidayImage').post(mulUpload.single('holidayImage'), this.controller.uploadHolidayImage)

    }
}
export default new ImageRouter().router;