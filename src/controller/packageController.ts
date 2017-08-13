import { Router, Request, Response, NextFunction } from 'express';
import { Packages } from './../Repository/packageRepository';

import * as Validator from 'validator';
import * as Moment from 'moment';



export class PackageController {

  // use this only one time to add all movies to MongoDb from MoviesData folder
public AddToDB(req: Request, res: Response, next: NextFunction) {
   // drop old collection from Mongo db
    Packages.collection.drop();
    //read data from PackageData folder and add to collection in mongo db
    let pkg = require('./../data/packages.json');
    Packages.collection.insert(pkg);
    res.send("data added")
  }
  /**
   * GET all movies.
   */
  public get(req: Request, res: Response, next: NextFunction) {

    Packages.find((error, packages) => {
      if (error) {
        res.status(500);
        res.send("internal server error");
      } else {
        res.status(200);
        res.send(packages);
      }
    });
  }

  /**
 * GET one movie by id
 */
  public getById(req: Request, res: Response, next: NextFunction) {
    
    Packages.findById(req.params.id, (error, pkg) => {
            if (error) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(pkg);
            }
        });
  }

    public search(req: Request, res: Response, next: NextFunction) {
      console.log(req.params);
      let city = req.params.city.trim();
      let minDay = req.params.minDay;
       let maxDay = req.params.maxDay;
       let depDate = Moment(req.params.depDate,"DD-MM-YYYY");
        console.log();
       let pkgType = req.params.pkgType.trim();
      if( 
        Validator.isEmpty(city)     ||
        !Validator.isNumeric(minDay) || 
        !Validator.isNumeric(maxDay) || 
        !depDate.isValid()  || !depDate.isAfter(Date.now()) || 
        Validator.isEmpty(pkgType)
      ){
                res.status(500);
                res.send("internal server error: invalid input parameter");
      }else{

    let regExCity = new RegExp(city, 'i');
    // Pakage json dont have date field add it and use it in filter
    Packages.find({
            $and: [
                { $or:[{cityName: regExCity},{tagDestination: regExCity},{name: regExCity}]},
                { nights: {$gte:( parseInt(minDay)-1)} },
                { nights: {$lt:parseInt(maxDay)} },
                { packageType:{ $eq: 'FIT' } }
            ]
        }, (error, pkg) => {
            if (error) {
                res.status(500);
                res.send("internal server error");
            } else {
                res.status(200);
                res.send(pkg);
            }
        });
  }
    }
}

export default PackageController;