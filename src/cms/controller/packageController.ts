import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageModel } from './../model/package';
export class PackageController {

    public add(req: Request, res: Response) {
        let newPackage = new PackageModel(req.body);
        newPackage.save().then((Package) => {
            res.status(200);
            res.send(Package);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageModel.find((err, Packages) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(Packages);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageModel.findById(req.params.id, (err, Package) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(Package);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageModel.findById(req.params.id).then((Package) => {
            Package.detail = req.body.detail;
            Package.validity = req.body.validity;
            Package.description = req.body.description;
            Package.createdBy = req.body.createdBy ? req.body.createdBy:"NA" ;

            return Package.save();
        }).then((Package) => {
            res.status(200);
            res.send(Package);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageModel.findById(req.params.id).then((Package) => {
            for (var key in req.body) {
                Package[key] = req.body[key];
            }
            return Package.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageModel.findById(req.params.id).then((Package) => {
            if (Package) {
                return Package.remove();
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

    public search(req: Request, res: Response) {
        let regEx = new RegExp(req.params.searchStr, 'i');
        PackageModel.find({ description: regEx}, (err, Packages) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(Packages);
            }
        })
    }
}
