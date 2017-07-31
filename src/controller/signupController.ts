import { Router, Request, Response, NextFunction } from 'express';
import  * as jwt from 'jwt-simple'
import User from './../models/user';


export class SignUpController {

  public signUpUser(req: Request, res: Response, next: NextFunction) {

    if (!req.body.userid || !req.body.password) {
      res.json({ success: false, msg: 'Please pass user ID and password.' });
    } else {
      var newUser = new User({
        name: req.body.name,
        userId: req.body.userid,
        password: req.body.password,
        mobile: req.body.mobile,
        email: req.body.email
      });
      // save the user
      newUser.save(function (err) {
        if (err) {
          return res.json({ success: false, msg: 'Username already exists.' });
        }
        res.json({ success: true, msg: 'Successful created new user.' });
      });
    }
  }

  public authenticate(req: Request, res: Response, next: NextFunction) {

    if (!req.body.userid || !req.body.password) {
      res.json({ success: false, msg: 'Please pass user ID and password.' });
    } else {
      User.findOne({
        name: req.body.name
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.encode(user, "MyS3cr3tK3Y");
              // return the information including token as JSON
              res.json({ success: true, token: 'JWT ' + token });
            } else {
              res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
          });
        }
      });
    }
  }

}

export default SignUpController;