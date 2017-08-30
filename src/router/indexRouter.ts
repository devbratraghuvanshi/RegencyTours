
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
import  PackageExclusionRouter from './../cms/router/packageInclusionRouter';
import  PackageRemarkRouter from './../cms/router/packageRemarkRouter';
import  PackageTermAndConditionRouter from './../cms/router/packageTermAndConditionRouter';
import  PackageDestinationRouter from './../cms/router/packageDestinationRouter';
import  PackageHotelRouter from './../cms/router/packageHotelRouter';
import  PackageCostingRouter from './../cms/router/packageCostingRouter';
import  PackageCancellationRuleRouter from './../cms/router/packageCancellationRuleRouter';
import  PackageVisaRequirementRouter from './../cms/router/packageVisaRequirementRouter';
import  PackagePaymentDetailRouter from './../cms/router/packagePaymentDetailRouter';
import  PackageFlightDetailRouter from './../cms/router/packageFlightDetailRouter';
import  PackageDepartureDatesRouter from './../cms/router/packageDepartureDatesRouter';
import  PackageAddOnToursRouter from './../cms/router/packageAddOnToursRouter';

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
    var auth = Passport.authenticate('jwt', { session: false});
    this.router.get('/', IndexController.get);
    this.router.post('/signup',new SignUpController().signUpUser);
    this.router.post('/authenticate',new SignUpController().authenticate);
  //  this.router.get('/memberinfo', Passport.authenticate('jwt', { session: false}),new SignUpController().memberInfo);
  // old one b2cthis.router.use('/api/v1/packages', PackageRouter);
    this.router.use('/api/v1/user',Passport.authenticate('jwt', { session: false}), UserRouter);
   // this.router.use('/api/v1/image', ImageRouter);
    this.router.use('/api/v1/city',auth, CityRouter);
    this.router.use('/api/v1/country',auth, CountryRouter);
    this.router.use('/api/v1/packageCategory',auth, PackageCategoryRouter);
    this.router.use('/api/v1/packageComponent',auth, PackageComponentRouter);
    this.router.use('/api/v1/factCategory',auth, FactCategoryRouter);
    this.router.use('/api/v1/packageSupplier',auth, PackageSupplierRouter);
    this.router.use('/api/v1/package',auth, PackageRouter);
    this.router.use('/api/v1/packageImage/',auth, PackageImageRouter);
    this.router.use('/api/v1/packageItinerary/',auth, PackageItineraryRouter);
    this.router.use('/api/v1/packageInclusion/',auth, PackageInclusionRouter);
    this.router.use('/api/v1/packageExclusion/',auth, PackageExclusionRouter);
    this.router.use('/api/v1/packageRemark/',auth, PackageRemarkRouter);
    this.router.use('/api/v1/packageTermAndCondition/',auth, PackageTermAndConditionRouter);
    this.router.use('/api/v1/packageDestination/',auth, PackageDestinationRouter);
    this.router.use('/api/v1/packageHotel/',auth, PackageHotelRouter);
    this.router.use('/api/v1/packageCosting/',auth, PackageCostingRouter);
    this.router.use('/api/v1/packageCancellationRule/',auth, PackageCancellationRuleRouter);
    this.router.use('/api/v1/packageVisaRequirement/',auth, PackageVisaRequirementRouter);
    this.router.use('/api/v1/packagePaymentDetail/',auth, PackagePaymentDetailRouter);
    this.router.use('/api/v1/packageFlightDetail/',auth, PackageFlightDetailRouter);
    this.router.use('/api/v1/packageDepartureDates/',auth, PackageDepartureDatesRouter);
    this.router.use('/api/v1/packageAddOnTours/',auth,PackageAddOnToursRouter);
  }
}
// Create the HeroRouter, and export its configured Express.Router
export default new IndexRouter().router;