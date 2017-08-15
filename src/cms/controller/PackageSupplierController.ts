import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageSupplierModel } from './../model/packageSupplier';
export class PackageSupplierController {

    public add(req: Request, res: Response) {
        let newPackageSupplier = new PackageSupplierModel(req.body);
        newPackageSupplier.save().then((supplier) => {
            res.status(200);
            res.send(supplier);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageSupplierModel.find((err, suppliers) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(suppliers);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageSupplierModel.findById(req.params.id, (err, suppliers) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(suppliers);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageSupplierModel.findById(req.params.id).then((Supplier) => {
            Supplier.supplierName = req.body.supplierName;
            Supplier.supplierCode = req.body.supplierCode;
            Supplier.supplierCompanyName = req.body.supplierCompanyName;
            Supplier.emailId = req.body.emailId;
            Supplier.address = req.body.address;
            Supplier.city = req.body.city;
            Supplier.state = req.body.state;
            Supplier.pinCode = req.body.pinCode;
            Supplier.country = req.body.country;
            Supplier.phone1 = req.body.phone1;
            Supplier.phone2 = req.body.phone2;
            Supplier.mobile = req.body.mobile;
            Supplier.fax = req.body.fax;
            Supplier.contactPerson = req.body.contactPerson;
            Supplier.contactDesignation = req.body.contactDesignation;
            Supplier.fax = req.body.fax;
            Supplier.suppServiceTypeId = req.body.suppServiceTypeId;
            Supplier.fax = req.body.fax;
            Supplier.status = req.body.status
            Supplier.createdBy = req.body.createdBy;
            return Supplier.save();
        }).then((Supplier) => {
            res.status(200);
            res.send(Supplier);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageSupplierModel.findById(req.params.id).then((Supplier) => {
            for (var key in req.body) {
                Supplier[key] = req.body[key];
            }
            return Supplier.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageSupplierModel.findById(req.params.id).then((Supplier) => {
            if (Supplier) {
                return Supplier.remove();
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
        PackageSupplierModel.find({
            '$or': [
                { SupplierName: regEx },
                { SupplierCode: regEx },
                {supplierCompanyName: regEx },
                {contactPerson: regEx }
            ]
        }, (err, categories) => {
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
