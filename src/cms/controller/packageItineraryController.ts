import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { PackageItineraryModel } from './../model/packageItinerary';
export class PackageItineraryController {

    public add(req: Request, res: Response) {
        let newPackageItinerary = new PackageItineraryModel(req.body);
        newPackageItinerary.save().then((itinerary) => {
            res.status(200);
            res.send(itinerary);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }
    public get(req: Request, res: Response) {
        PackageItineraryModel.find((err, itineraries) => {
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
        PackageItineraryModel.findById(req.params.id, (err, itineraries) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", error: err });
            } else {
                res.status(200);
                res.send(itineraries);
            }
        })
    }

    public update(req: Request, res: Response) {
        PackageItineraryModel.findById(req.params.id).then((itinerary) => {
            itinerary.packageId = req.body.packageId;
            itinerary.imageId = req.body.imageId;
            itinerary.day = req.body.day;
            itinerary.cityId = req.body.cityId;
            itinerary.briefDesc = req.body.briefDesc;
            itinerary.description = req.body.description;
            itinerary.status = req.body.status;
            itinerary.createdBy = req.body.createdBy;
            return itinerary.save();
        }).then((itinerary) => {
            res.status(200);
            res.send(itinerary);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public patch(req: Request, res: Response) {
        PackageItineraryModel.findById(req.params.id).then((itinerary) => {
            for (var key in req.body) {
                itinerary[key] = req.body[key];
            }
            return itinerary.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", error: err });
        });
    }

    public delete(req: Request, res: Response) {
        PackageItineraryModel.findById(req.params.id).then((itinerary) => {
            if (itinerary) {
                return itinerary.remove();
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
