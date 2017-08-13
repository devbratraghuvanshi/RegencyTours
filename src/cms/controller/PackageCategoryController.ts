import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageCategoryModel } from './../model/packageCategory';
export class PackageCategoryController {

    public add(req: Request, res: Response) {
        let newPackageCategory = new PackageCategoryModel(req.body);
        newPackageCategory.save().then((category) => {
            res.status(200);
            res.send(category);
        }).catch((err) => {
            res.status(500);
            res.send("internal server error");
        });
    }
    public get(req: Request, res: Response) {
        PackageCategoryModel.find((err, categories) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(categories);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageCategoryModel.findById(req.params.id, (err, category) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(category);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageCategoryModel.findById(req.params.id).then((category) => {
            category.categoryName = req.body.categoryName;
            category.categoryCode = req.body.cityCode;
            category.status = req.body.state;

            return category.save();
        }).then((category) => {
            res.status(200);
            res.send(category);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }

    public patch(req: Request, res: Response) {
        PackageCategoryModel.findById(req.params.id).then((category) => {
            for (var key in req.body) {
                category[key] = req.body[key];
            }
            return category.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }

    public delete(req: Request, res: Response) {
        PackageCategoryModel.findByIdAndRemove(req.params.id).then(() => {
            res.status(204);
            res.send("user removed");
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }

    public search(req: Request, res: Response) {
        let regEx = new RegExp(req.params.searchStr, 'i');
        PackageCategoryModel.find({
            '$or': [
                { categoryName: regEx },
                { categoryCode: regEx }
            ]
        }, (err, categories) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(categories);
            }
        })
    }
}