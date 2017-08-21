
import {Router, Request, Response, NextFunction} from 'express';
import * as Passport from 'passport'

import IndexController from './../controller/IndexController'
import SignUpController  from './../controller/signupController';

// old one b2c import  PackageRouter   from './packageRouter';
import  UserRouter  from './userRouter';
import  ImageRouter  from './imageRouter';
import  CityRouter  from '../cms/router/cityRouter';
import  CountryRouter  from '../cms/router/countryRouter';
import  PackageCategoryRouter  from '../cms/router/packageCategoryRouter';
import  PackageComponentRouter  from '../cms/router/packageComponentRouter';
import  FactCategoryRouter  from '../cms/router/FactCategoryRouter';
import  PackageSupplierRouter  from '../cms/router/PackageSupplierRouter';
import  PackageRouter  from '../cms/router/PackageRouter';
import  PackageImageRouter  from './../cms/router/packageImageRouter';
import  PackageItineraryRouter  from './../cms/router/packageItineraryRouter';
import  PackageInclusionRouter from './../cms/router/packageInclusionRouter';

export class IndexRouter {
  router: Router
  /**
   * Initialize the indexRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
  this.router.get('/', IndexController.get);
    this.router.post('/signup',new SignUpController().signUpUser);
    this.router.post('/authenticate',new SignUpController().authenticate);
  //  this.router.get('/memberinfo', Passport.authenticate('jwt', { session: false}),new SignUpController().memberInfo);
  // old one b2cthis.router.use('/api/v1/packages', PackageRouter);
    this.router.use('/api/v1/user',Passport.authenticate('jwt', { session: false}), UserRouter);
   // this.router.use('/api/v1/image', ImageRouter);
    this.router.use('/api/v1/city', CityRouter);
    this.router.use('/api/v1/country', CountryRouter);
    this.router.use('/api/v1/packageCategory', PackageCategoryRouter);
    this.router.use('/api/v1/packageComponent', PackageComponentRouter);
    this.router.use('/api/v1/factCategory', FactCategoryRouter);
    this.router.use('/api/v1/packageSupplier', PackageSupplierRouter);
    this.router.use('/api/v1/package', PackageRouter);
    this.router.use('/api/v1/packageImage/', PackageImageRouter);
    this.router.use('/api/v1/packageItinerary/', PackageItineraryRouter);
    this.router.use('/api/v1/packageInclusion/', PackageInclusionRouter);
  }
}
// Create the HeroRouter, and export its configured Express.Router
export default new IndexRouter().router;