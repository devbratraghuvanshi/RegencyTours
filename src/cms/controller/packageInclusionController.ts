import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageInclusionModel } from './../model/packageInclusion';
export class PackageInclusionController {

    public add(req: Request, res: Response) {
        let newPackageInclusion = new PackageInclusionModel(req.body);
        newPackageInclusion.save().then((inclusion) => {
            res.status(200);
            res.send(inclusion);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageInclusionModel.find((err, itineraries) => {
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
        PackageInclusionModel.findById(req.params.id, (err, inclusions) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(inclusions);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageInclusionModel.findById(req.params.id).then((inclusion) => {
            inclusion.packageId = req.body.packageId;
            inclusion.specType = req.body.specType;
            inclusion.sequenceNo = req.body.sequenceNo;
            inclusion.briefDesc = req.body.briefDesc;
            inclusion.description = req.body.description;
            inclusion.status = req.body.status;
            inclusion.createdBy = req.body.createdBy;
            return inclusion.save();
        }).then((inclusion) => {
            res.status(200);
            res.send(inclusion);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageInclusionModel.findById(req.params.id).then((inclusion) => {
            for (var key in req.body) {
                inclusion[key] = req.body[key];
            }
            return inclusion.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageInclusionModel.findById(req.params.id).then((inclusion) => {
            if (inclusion) {
                return inclusion.remove();
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
