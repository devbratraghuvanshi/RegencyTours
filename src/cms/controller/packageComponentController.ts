import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageComponentModel } from './../model/packageComponent';
export class PackageComponentController {

    public add(req: Request, res: Response) {
        let newPackageComponent = new PackageComponentModel(req.body);
        newPackageComponent.save().then((component) => {
            res.status(200);
            res.send(component);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageComponentModel.find((err, components) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(components);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageComponentModel.findById(req.params.id, (err, component) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(component);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageComponentModel.findById(req.params.id).then((component) => {
            component.componentName = req.body.componentName;
            component.componentCode = req.body.componentCode;
            component.status = req.body.status;

            return component.save();
        }).then((component) => {
            res.status(200);
            res.send(component);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageComponentModel.findById(req.params.id).then((component) => {
            for (var key in req.body) {
                component[key] = req.body[key];
            }
            return component.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageComponentModel.findById(req.params.id).then((component) => {
            if (component) {
                return component.remove();
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
        PackageComponentModel.find({
            '$or': [
                { ComponentName: regEx },
                { ComponentCode: regEx }
            ]
        }, (err, components) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(components);
            }
        })
    }
}
