import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { CityModel } from './../models/city';
export class CityController {

    public add(req: Request, res: Response) {
        let newCity = new CityModel(req.body);
        newCity.save().then((city) => {
            res.status(200);
            res.send(city);
        }).catch((err) => {
            res.status(500);
            res.send("internal server error");
        });
    }
    public get(req: Request, res: Response) {
        CityModel.find((err, cities) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(cities);
            }
        })
    }

    public getById(req: Request, res: Response) {
        CityModel.findById(req.params.id, (err, users) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(users);
            }
        })
    }

    public update(req: Request, res: Response) {
        CityModel.findById(req.params.id).then((city) => {
            city.cityName = req.body.cityName;
            city.cityCode = req.body.cityCode;
            city.state = req.body.state;
            city.lon = req.body.lon;
            city.lat = req.body.lat;
            return city.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }

    public patch(req: Request, res: Response) {
        CityModel.findById(req.params.id).then((user) => {
            for (var key in req.body) {
                user[key] = req.body[key];
            }
            return user.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }

    public delete(req: Request, res: Response) {
        CityModel.findByIdAndRemove(req.params.id).then(() => {
            res.status(204);
            res.send("user removed");
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }

    public search(req: Request, res: Response) {
        let regEx = new RegExp(req.params.searchStr, 'i');
        CityModel.find({
            '$or': [
                { cityName: regEx },
                { cityCode: regEx }
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
