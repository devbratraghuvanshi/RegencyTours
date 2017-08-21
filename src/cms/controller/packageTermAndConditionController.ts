import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageTermAndConditionModel } from './../model/packageTermAndCondition';
export class PackageTermAndConditionController {

    public add(req: Request, res: Response) {
        let newPackageTermAndCondition = new PackageTermAndConditionModel(req.body);
        newPackageTermAndCondition.save().then((tc) => {
            res.status(200);
            res.send(tc);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageTermAndConditionModel.find((err, tc) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(tc);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageTermAndConditionModel.findById(req.params.id, (err, tc) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(tc);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageTermAndConditionModel.findById(req.params.id).then((tc) => {
            tc.packageId = req.body.packageId;
            tc.termsAndCondition = req.body.termsAndCondition;
            tc.status = req.body.status;
            tc.createdBy = req.body.createdBy;
            return tc.save();
        }).then((tc) => {
            res.status(200);
            res.send(tc);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageTermAndConditionModel.findById(req.params.id).then((tc) => {
            for (var key in req.body) {
                tc[key] = req.body[key];
            }
            return tc.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageTermAndConditionModel.findById(req.params.id).then((tc) => {
            if (tc) {
                return tc.remove();
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
