import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { UserModel } from './../models/user';
export class UserController {

    public add(req: Request, res: Response) {
        let newUser = new UserModel(req.body);
        newUser.save().then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", status: false, err: err });
        });
    }

    public get(req: Request, res: Response) {
        UserModel.find((err, users) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", status: false, err: err });
            } else {
                res.status(200);
                res.send(users);
            }
        })
    }

    public getById(req: Request, res: Response) {
        UserModel.findById(req.params.id, (err, users) => {
            if (err) {
                res.status(500);
                res.send({ message: "internal server error", status: false, err: err });
            } else {
                res.status(200);
                res.send(users);
            }
        })
    }

    public update(req: Request, res: Response) {
        UserModel.findById(req.params.id).then((user) => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.mobile = req.body.mobile;
            return user.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", status: false, err: err });
        });
    }

    public patch(req: Request, res: Response) {
        UserModel.findById(req.params.id).then((user) => {
            for (var key in req.body) {
                user[key] = req.body[key];
            }
            return user.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send({ message: "internal server error", status: false, err: err });
        });
    }

    public delete(req: Request, res: Response) {
        UserModel.findById(req.params.id).then((user) => {
            if (user) {
                return user.remove();
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