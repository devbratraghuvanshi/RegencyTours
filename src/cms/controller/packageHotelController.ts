import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageHotelModel } from './../model/packageHotel';
export class PackageHotelController {

    public add(req: Request, res: Response) {
        let newPackageHotel = new PackageHotelModel(req.body);
        newPackageHotel.save().then((hotel) => {
            res.status(200);
            res.send(hotel);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageHotelModel.find((err, itineraries) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(itineraries);
            }
        })
    }

    public getById(req: Request, res: Response) {
        PackageHotelModel.findById(req.params.id, (err, hotels) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(hotels);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageHotelModel.findById(req.params.id).then((hotel) => {
            hotel.packageId = req.body.packageId;
            hotel.cityId = req.body.cityId;
            hotel.imageId = req.body.imageId;
            hotel.category = req.body.category;
            hotel.hotelName = req.body.hotelName;
            hotel.description = req.body.description;
            hotel.status = req.body.status;
            hotel.createdBy = req.body.createdBy;
            return hotel.save();
        }).then((hotel) => {
            res.status(200);
            res.send(hotel);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageHotelModel.findById(req.params.id).then((hotel) => {
            for (var key in req.body) {
                hotel[key] = req.body[key];
            }
            return hotel.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageHotelModel.findById(req.params.id).then((hotel) => {
            if (hotel) {
                return hotel.remove();
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
