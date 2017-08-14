import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { FactCategoryModel } from './../model/FactCategory';
export class FactCategoryController {

    public add(req: Request, res: Response) {
        let newFactCategory = new FactCategoryModel(req.body);
        newFactCategory.save().then((category) => {
            res.status(200);
            res.send(category);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        FactCategoryModel.find((err, categories) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(categories);
            }
        })
    }

    public getById(req: Request, res: Response) {
        FactCategoryModel.findById(req.params.id, (err, category) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(category);
            }
        })
    }

    public update(req: Request, res: Response) {
        FactCategoryModel.findById(req.params.id).then((category) => {
            category.factType = req.body.factType;
            category.status = req.body.status;
            category.createdBy = req.body.createdBy;

            return category.save();
        }).then((category) => {
            res.status(200);
            res.send(category);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        FactCategoryModel.findById(req.params.id).then((category) => {
            for (var key in req.body) {
                category[key] = req.body[key];
            }
            return category.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        FactCategoryModel.findById(req.params.id).then((category) => {
            if (category) {
                return category.remove();
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
        FactCategoryModel.find({ facType: regEx }, (err, categories) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(categories);
            }
        })
    }
}
