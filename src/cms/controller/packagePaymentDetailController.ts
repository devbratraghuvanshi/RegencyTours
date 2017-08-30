import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackagePaymentDetailModel } from './../model/PackagePaymentDetail';
export class PackagePaymentDetailController {

    public add(req: Request, res: Response) {
        let newPackagePaymentDetail = new PackagePaymentDetailModel(req.body);
        newPackagePaymentDetail.save().then((payDetail) => {
            res.status(200);
            res.send(payDetail);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackagePaymentDetailModel.find((err, payDetail) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(payDetail);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackagePaymentDetailModel.findById(req.params.id, (err, payDetail) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(payDetail);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackagePaymentDetailModel.findById(req.params.id).then((payDetail) => {
            payDetail.packageId = req.body.packageId;
            payDetail.description = req.body.description;
            payDetail.status = req.body.status;
            payDetail.createdBy = req.body.createdBy;
            return payDetail.save();
        }).then((payDetail) => {
            res.status(200);
            res.send(payDetail);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackagePaymentDetailModel.findById(req.params.id).then((payDetail) => {
            for (var key in req.body) {
                payDetail[key] = req.body[key];
            }
            return payDetail.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackagePaymentDetailModel.findById(req.params.id).then((payDetail) => {
            if (payDetail) {
                return payDetail.remove();
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
