import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageDepartureDatesModel } from './../model/PackageDepartureDates';
export class PackageDepartureDatesController {

    public add(req: Request, res: Response) {
        let newPackageDepartureDates = new PackageDepartureDatesModel(req.body);
        newPackageDepartureDates.save().then((depDates) => {
            res.status(200);
            res.send(depDates);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageDepartureDatesModel.find((err, depDates) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(depDates);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageDepartureDatesModel.findById(req.params.id, (err, depDates) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(depDates);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageDepartureDatesModel.findById(req.params.id).then((depDates) => {
            depDates.packageId = req.body.packageId;
            depDates.monthName = req.body.monthName;
            depDates.date = req.body.date;
            depDates.status = req.body.status;
            depDates.createdBy = req.body.createdBy;
            return depDates.save();
        }).then((depDates) => {
            res.status(200);
            res.send(depDates);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageDepartureDatesModel.findById(req.params.id).then((depDates) => {
            for (var key in req.body) {
                depDates[key] = req.body[key];
            }
            return depDates.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageDepartureDatesModel.findById(req.params.id).then((depDates) => {
            if (depDates) {
                return depDates.remove();
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
