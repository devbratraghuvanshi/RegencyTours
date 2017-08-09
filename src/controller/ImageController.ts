
import { Request, Response } from 'express';



export class ImageController{

    uploadHolidayImage(req: Request, res: Response){
        res.send({ 
            originalname:req.file.originalname, 
            fileName: req.file.filename, 
            mimetype: req.file.mimetype,
            path:req.file.path,
            size:req.file.size
        });

    }

}