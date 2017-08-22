import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageDestinationModel } from './../model/packageDestination';
export class PackageDestinationController {

    public add(req: Request, res: Response) {
        let newPackageDestination = new PackageDestinationModel(req.body);
        newPackageDestination.save().then((destination) => {
            res.status(200);
            res.send(destination);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageDestinationModel.find((err, itineraries) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(itineraries);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageDestinationModel.findById(req.params.id, (err, itineraries) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(itineraries);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageDestinationModel.findById(req.params.id).then((destination) => {
            destination.packageId = req.body.packageId;
            destination.cityId = req.body.cityId;
            destination.imageId = req.body.imageId;
            destination.factId = req.body.factId;
            destination.description = req.body.description;
            destination.status = req.body.status;
            destination.createdBy = req.body.createdBy;
            return destination.save();
        }).then((destination) => {
            res.status(200);
            res.send(destination);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageDestinationModel.findById(req.params.id).then((destination) => {
            for (var key in req.body) {
                destination[key] = req.body[key];
            }
            return destination.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageDestinationModel.findById(req.params.id).then((destination) => {
            if (destination) {
                return destination.remove();
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
