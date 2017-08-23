import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageCancellationRuleModel } from './../model/packageCancellationRule';
export class PackageCancellationRuleController {

    public add(req: Request, res: Response) {
        let newPackageCancellationRule = new PackageCancellationRuleModel(req.body);
        newPackageCancellationRule.save().then((rule) => {
            res.status(200);
            res.send(rule);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageCancellationRuleModel.find((err, rules) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(rules);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageCancellationRuleModel.findById(req.params.id, (err, rules) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(rules);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageCancellationRuleModel.findById(req.params.id).then((rule) => {
            rule.packageId = req.body.packageId;
            rule.condition = req.body.condition;
            rule.dayFrom = req.body.dayFrom;
            rule.dayTo = req.body.dayTo;
            rule.currency = req.body.currency;
            rule.cancellationAmount = req.body.cancellationAmount;
            rule.cancellationPercent = req.body.cancellationPercent;
            rule.cancellationType = req.body.cancellationType;
            rule.status = req.body.status;
            rule.createdBy = req.body.createdBy;
            return rule.save();
        }).then((rule) => {
            res.status(200);
            res.send(rule);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageCancellationRuleModel.findById(req.params.id).then((rule) => {
            for (var key in req.body) {
                rule[key] = req.body[key];
            }
            return rule.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageCancellationRuleModel.findById(req.params.id).then((rule) => {
            if (rule) {
                return rule.remove();
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
