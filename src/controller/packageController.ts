import { Router, Request, Response, NextFunction } from 'express';

import { Packages } from './../Repository/packageRepository';


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
}

export default PackageController;