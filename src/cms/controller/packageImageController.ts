import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageImageModel } from './../model/packageImage';

export class PackageImageController {

    public add(req: Request, res: Response) {
        if(!req.file || !req.body.packageId){
            res.status(500);
            res.send({ message:" Ops!!! PackageImage' or packageId is missing bro !" });
            return;
        }
        let newPackageImage = new PackageImageModel(req.body);
        newPackageImage.packageId =  req.body.packageId;
        newPackageImage.imageUrl =   req.protocol + '://' + req.get('host')+'/' + req.file.path.replace(/\\/g,'/');
        newPackageImage.imageTag =   req.body.packageId;
        newPackageImage.attribute =  req.body.attribute;
        newPackageImage.status =     req.body.status;
        

        newPackageImage.save().then((image) => {
            res.status(200);
            res.send(image);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageImageModel.find((err, image) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(image);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageImageModel.findById(req.params.id, (err, image) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(image);
            }
        })
    }

    public delete(req: Request, res: Response) {
        PackageImageModel.findById(req.params.id).then((image) => {
            if (image) {
                return image.remove();
            } else {
                return Promise.resolve(null) as Promise<any>;
            }
        }).then((removed) => {
            res.status(200);
            if (!removed) {
                res.send({ message: 'resource not found with given ID', status: false });
            } else {
                res.send({ message: "resource deleted successfully", status: true, data: removed });
            }
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", status: false, err: err });
        });
    }
    
    public getByPackageId(req: Request, res: Response) {
        PackageImageModel.find( { packageId:  req.params.packageId }, (err, images) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(images);
            }
        })
    }

    public deleteByPackageId(req: Request, res: Response) {
        PackageImageModel.find({ packageId: req.params.packageId }).then((images) => {
            if (images && images.length > 0) {
                var promises = []
                images.forEach((img) => { promises.push(img.remove())});
                return Promise.all(promises);
            } else {
                return Promise.resolve(null) as Promise<any>;
            }
        }).then((removed) => {
            res.status(200);
            if (!removed) {
                res.send({ message: 'resource not found with given ID', status: false });
            } else {
                res.send({ message: "resource deleted successfully", status: true, data: removed });
            }
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", status: false, err: err });
        });
    }

}
