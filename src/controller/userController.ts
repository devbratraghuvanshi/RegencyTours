import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { UserModel } from './../models/user';
export class UserController {

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
        UserModel.findById(req.params.id,(err, users) => {
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