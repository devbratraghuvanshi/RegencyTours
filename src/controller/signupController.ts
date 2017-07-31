import { Router, Request, Response, NextFunction } from 'express';

import User from './../models/user';


export class SignUpController {

  public SignUpUser(req: Request, res: Response, next: NextFunction) {

if (!req.body.userid || !req.body.password) {
    res.json({success: false, msg: 'Please pass user ID and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      userId: req.body.userid,
      password: req.body.password,
      mobile:req.body.mobile,
      email: req.body.email
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
  }


}

export default SignUpController;