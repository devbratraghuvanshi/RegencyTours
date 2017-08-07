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
            res.send("internal server error");
        });
    }

    public get(req: Request, res: Response) {
        UserModel.find((err, users) => {
            if (err) {
                res.status(500);
                res.send("internal server error");
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
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(users);
            }
        })
    }

    public update(req: Request, res: Response) {
        UserModel.findById(req.params.id).then((user) => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.mobile = req.body.mobile;
            return user.save();
        }).then((user) => {
            res.status(200);
            res.send(user);
        }).catch((err) => {
            res.status(500);
            res.send(err);
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
            res.send(err);
        });
    }

    public delete(req: Request, res: Response) {
        UserModel.findByIdAndRemove(req.params.id).then(() => {
            res.status(204);
            res.send("user removed");
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });
    }
} 