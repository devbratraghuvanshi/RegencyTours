import { mongoose } from './../dbConfig/db';
import { IPackage } from './interfacePackage';

//This IMovieModel now can be passed as a type argument for Mongoose's model function
export interface IPackageModel extends IPackage, mongoose.Document { }