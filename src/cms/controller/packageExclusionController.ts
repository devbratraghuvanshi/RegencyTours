import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageExclusionModel } from './../model/packageExclusion';
export class PackageExclusionController {

    public add(req: Request, res: Response) {
        let newPackageExclusion = new PackageExclusionModel(req.body);
        newPackageExclusion.save().then((exclusion) => {
            res.status(200);
            res.send(exclusion);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageExclusionModel.find((err, itineraries) => {
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
        PackageExclusionModel.findById(req.params.id, (err, Exclusions) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(Exclusions);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageExclusionModel.findById(req.params.id).then((exclusion) => {
            exclusion.packageId = req.body.packageId;
            exclusion.sequenceNo = req.body.sequenceNo;
            exclusion.briefDesc = req.body.briefDesc;
            exclusion.description = req.body.description;
            exclusion.status = req.body.status;
            exclusion.createdBy = req.body.createdBy;
            return exclusion.save();
        }).then((exclusion) => {
            res.status(200);
            res.send(exclusion);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageExclusionModel.findById(req.params.id).then((exclusion) => {
            for (var key in req.body) {
                exclusion[key] = req.body[key];
            }
            return exclusion.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageExclusionModel.findById(req.params.id).then((exclusion) => {
            if (exclusion) {
                return exclusion.remove();
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
