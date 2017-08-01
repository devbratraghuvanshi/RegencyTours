import { Router, Request, Response, NextFunction } from 'express';
import User from './../models/user'; 
import * as utility from "./../utility/utility"


export class SignUpController {

  public signUpUser(req: Request, res: Response, next: NextFunction) {

    if (!req.body.userId || !req.body.password) {
      res.json({ success: false, msg: 'Please pass user ID and password.' });
    } else {
      var newUser = new User({
        name: req.body.name,
        userId: req.body.userId,
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

    if (!req.body.userId || !req.body.password) {
      res.json({ success: false, msg: 'Please pass user ID and password.' });
    } else {
      User.findOne({
        userId: req.body.userId
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = utility.jwtEncode(user);
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

  public memberInfo(req: Request, res: Response, next: NextFunction)
  {
      var token = utility.getToken(req.headers);
  if (token) {
    var decoded = utility.jwtDecode(token);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!', user :user});
        }
    });

  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }


  }

}

export default SignUpController;