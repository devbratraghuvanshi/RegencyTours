import { Router } from 'express';
import { ImageController } from './../controller/ImageController';
import { FileUploader } from './../config/multerConfig';

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
        this.router.route('/holidayImage')
        .post(new FileUploader('src/images/holidayImage').multer.single('holidayImage'),
         this.controller.uploadHolidayImage)
       // this.router.route('/holidayImage2').post(new FileUploader('src/images/holidayImage2').multer.array('holidayImage', 2), this.controller.uploadHolidayImage)

    }
}
export default new ImageRouter().router;