import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageRemarkModel } from './../model/packageRemark';
export class PackageRemarkController {

    public add(req: Request, res: Response) {
        let newPackageRemark = new PackageRemarkModel(req.body);
        newPackageRemark.save().then((Remark) => {
            res.status(200);
            res.send(Remark);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageRemarkModel.find((err, remarks) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(remarks);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageRemarkModel.findById(req.params.id, (err, remarks) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(remarks);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageRemarkModel.findById(req.params.id).then((remarks) => {
            remarks.packageId = req.body.packageId;
            remarks.briefDesc = req.body.briefDesc;
            remarks.description = req.body.description;
            remarks.status = req.body.status;
            remarks.createdBy = req.body.createdBy;
            return remarks.save();
        }).then((Remark) => {
            res.status(200);
            res.send(Remark);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageRemarkModel.findById(req.params.id).then((remarks) => {
            for (var key in req.body) {
                remarks[key] = req.body[key];
            }
            return remarks.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageRemarkModel.findById(req.params.id).then((remarks) => {
            if (remarks) {
                return remarks.remove();
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
