import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageAddOnToursModel } from './../model/PackageAddOnTours';
export class PackageAddOnToursController {

    public add(req: Request, res: Response) {
        let newPackageAddOnTours = new PackageAddOnToursModel(req.body);
        newPackageAddOnTours.save().then((tours) => {
            res.status(200);
            res.send(tours);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageAddOnToursModel.find((err, tours) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(tours);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageAddOnToursModel.findById(req.params.id, (err, tours) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(tours);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageAddOnToursModel.findById(req.params.id).then((tours) => {
            tours.packageId = req.body.packageId;
            tours.tourName = req.body.tourName;
            tours.tourCost = req.body.tourCost;
            tours.status = req.body.status;
            tours.createdBy = req.body.createdBy;
            return tours.save();
        }).then((tours) => {
            res.status(200);
            res.send(tours);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageAddOnToursModel.findById(req.params.id).then((tours) => {
            for (var key in req.body) {
                tours[key] = req.body[key];
            }
            return tours.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageAddOnToursModel.findById(req.params.id).then((tours) => {
            if (tours) {
                return tours.remove();
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
