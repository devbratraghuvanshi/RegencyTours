import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { CountryModel } from './../model/country';
export class CountryController {

    public add(req: Request, res: Response) {
        let newCountry = new CountryModel(req.body);
        newCountry.save().then((country) => {
            res.status(200);
            res.send(country);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        CountryModel.find((err, countries) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(countries);
            }
        })
    }

    public getById(req: Request, res: Response) {
        CountryModel.findById(req.params.id, (err, users) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(users);
            }
        })
    }

    public update(req: Request, res: Response) {
        CountryModel.findById(req.params.id).then((country) => {
            country.countryName = req.body.CountryName;
            country.countryCode = req.body.CountryCode;
            return country.save();
        }).then((country) => {
            res.status(200);
            res.send(country);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        CountryModel.findById(req.params.id).then((country) => {
            for (var key in req.body) {
                country[key] = req.body[key];
            }
            return country.save();
        }).then((country) => {
            res.status(200);
            res.send(country);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        CountryModel.findById(req.params.id).then((country) => {
            if (country) {
                return country.remove();
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
        CountryModel.find({
            '$or': [
                { CountryName: regEx },
                { CountryCode: regEx }
            ]
        }, (err, users) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(users);
            }
        })
    }
}
