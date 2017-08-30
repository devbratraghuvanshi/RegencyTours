import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageFlightDetailModel } from './../model/PackageFlightDetail';
export class PackageFlightDetailController {

    public add(req: Request, res: Response) {
        let newPackageFlightDetail = new PackageFlightDetailModel(req.body);
        newPackageFlightDetail.save().then((flightDetail) => {
            res.status(200);
            res.send(flightDetail);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageFlightDetailModel.find((err, flightDetail) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(flightDetail);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageFlightDetailModel.findById(req.params.id, (err, flightDetail) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(flightDetail);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageFlightDetailModel.findById(req.params.id).then((flightDetail) => {
            flightDetail.packageId = req.body.packageId;
            flightDetail.airLine = req.body.airLine;
            flightDetail.oneWay = req.body.oneWay;
            flightDetail.twoWay = req.body.twoWay;
            flightDetail.status = req.body.status;
            flightDetail.createdBy = req.body.createdBy;
            return flightDetail.save();
        }).then((flightDetail) => {
            res.status(200);
            res.send(flightDetail);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageFlightDetailModel.findById(req.params.id).then((flightDetail) => {
            for (var key in req.body) {
                flightDetail[key] = req.body[key];
            }
            return flightDetail.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageFlightDetailModel.findById(req.params.id).then((flightDetail) => {
            if (flightDetail) {
                return flightDetail.remove();
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
