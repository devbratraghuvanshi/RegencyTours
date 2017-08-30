import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageVisaRequirementModel } from './../model/PackageVisaRequirement';
export class PackageVisaRequirementController {

    public add(req: Request, res: Response) {
        let newPackageVisaRequirement = new PackageVisaRequirementModel(req.body);
        newPackageVisaRequirement.save().then((visaReq) => {
            res.status(200);
            res.send(visaReq);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageVisaRequirementModel.find((err, visaReq) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(visaReq);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageVisaRequirementModel.findById(req.params.id, (err, visaReq) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(visaReq);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageVisaRequirementModel.findById(req.params.id).then((visaReq) => {
            visaReq.packageId = req.body.packageId;
            visaReq.description = req.body.description;
            visaReq.status = req.body.status;
            visaReq.createdBy = req.body.createdBy;
            return visaReq.save();
        }).then((visaReq) => {
            res.status(200);
            res.send(visaReq);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageVisaRequirementModel.findById(req.params.id).then((visaReq) => {
            for (var key in req.body) {
                visaReq[key] = req.body[key];
            }
            return visaReq.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageVisaRequirementModel.findById(req.params.id).then((visaReq) => {
            if (visaReq) {
                return visaReq.remove();
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
