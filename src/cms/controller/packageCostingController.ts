import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageCostingModel } from './../model/packageCosting';
export class PackageCostingController {

    public add(req: Request, res: Response) {
        let newPackageCosting = new PackageCostingModel(req.body);
        newPackageCosting.save().then((costing) => {
            res.status(200);
            res.send(costing);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageCostingModel.find((err, costings) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(costings);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageCostingModel.findById(req.params.id, (err, costings) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(costings);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageCostingModel.findById(req.params.id).then((costing) => {
            costing.packageId = req.body.packageId;
            costing.packageCategoryId = req.body.packageCategoryId;
            costing.hotelCategory = req.body.hotelCategory;
            costing.validityFrom = req.body.validityFrom;
            costing.validityTo = req.body.validityTo;
            costing.currencyFormat = req.body.currencyFormat;
            costing.adultOnSingleSharingBasis = req.body.adultOnSingleSharingBasis;
            costing.adultOnTwinSharingBasis = req.body.adultOnTwinSharingBasis;
            costing.adultOnTripleSharingBasis = req.body.adultOnTripleSharingBasis;
            costing.childWithBed = req.body.childWithBed;
            costing.childWithoutBed = req.body.childWithoutBed;
            costing.Infant = req.body.Infant;
            costing.minimumDepositAmount = req.body.minimumDepositAmount;
            costing.minimumDepositPercent = req.body.minimumDepositPercent;
            costing.status = req.body.status;
            costing.createdBy = req.body.createdBy;
            return costing.save();
        }).then((costing) => {
            res.status(200);
            res.send(costing);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageCostingModel.findById(req.params.id).then((costing) => {
            for (var key in req.body) {
                costing[key] = req.body[key];
            }
            return costing.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageCostingModel.findById(req.params.id).then((costing) => {
            if (costing) {
                return costing.remove();
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
