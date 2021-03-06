import { Document, Schema, Model, model } from 'mongoose';

export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "All", "None"];
export const BOOKING_TYPE = ["Offline", "online", "both"];
export const PACKAGE_TYPE = ["Domestic", "International"];

// PackageValidity Interface 
export interface IPackageValidityModel extends Document {
    packageType: String;
    validFromDate: Date;
    validToDate: Date;
    bookingFromDate: Date;
    bookingToDate: Date;
    validDays: [String];
    duration: Number;
    bookingType: String;
};

//PackageValidity Schema
export const PackageValiditySchema = new Schema({
    packageType: {
        type: String,
        enum: PACKAGE_TYPE,
        required: true
    },
    validFromDate: {
        type: Date,
        required: true
    },
    validToDate: {
        type: Date,
        required: true
    },
    bookingFromDate: {
        type: Date,
        required: true
    },
    bookingToDate: {
        type: Date,
        required: true
    },
    validDays: {
        type: [String],
        enum: DAYS_OF_WEEK,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    bookingType: {
        type: String,
        enum: BOOKING_TYPE,
        required: true
    }
});

export const PackageValidityModel = model<IPackageValidityModel>('PackageValidity', PackageValiditySchema);
// export default PackageValidity;