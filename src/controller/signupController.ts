import { Router, Request, Response, NextFunction } from 'express';
import * as utility from "./../utility/utility"
import { UserModel } from './../models/user';
import UserCredential from './../models/userCredential';


export class SignUpController {

  public signUpUser(req: Request, res: Response, next: NextFunction) {

    if (!req.body.userId || !req.body.password) {
      res.json({ success: false, msg: 'Please pass user ID and password.' });
    } else {

      // register user => save Id and Password
      var newUserCredential = new UserCredential({
        userId: req.body.userId,
        password: req.body.password,
      });

      var newUser = new UserModel({
        name: req.body.name,
        userId: req.body.userId,
        mobile: req.body.mobile,
        email: req.body.email
      });

      newUserCredential.save().then( () => {
         // save the user in user table
        return newUser.save();
      }).then(() => {
        res.json({ success: true, msg: 'Successful created new user.' });
      },(err) => {
         return res.json({ success: false, msg: 'Username already exists.' });
      });

    }
  }

  public authenticate(req: Request, res: Response, next: NextFunction) {

    if (!req.body.userId || !req.body.password) {
      res.json({ success: false, msg: 'Please pass user ID and password.' });
    } else {
      UserCredential.findOne({
        userId: req.body.userId
      }, function (err, userCredential) {
        if (err) throw err;
        if (!userCredential) {
          res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          // check if password matches
          userCredential.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = utility.jwtEncode(userCredential);
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

  public memberInfo(req: Request, res: Response, next: NextFunction) {
    var token = utility.getToken(req.headers);
    if (token) {
      var decoded = utility.jwtDecode(token);
      UserModel.findOne({
        userId: decoded.userId
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          res.json({ success: true, msg: 'Welcome in the member area ' + user.name + '!', user: user });
        }
      });

    } else {
      return res.status(403).send({ success: false, msg: 'No token provided.' });
    }


  }

}

export default SignUpController;