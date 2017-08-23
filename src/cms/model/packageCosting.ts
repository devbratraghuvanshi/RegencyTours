import { Document, Schema, Model, model } from 'mongoose';

// PackageCosting Interface 
export interface IPackageCostingModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    packageCategoryId: Schema.Types.ObjectId;
    hotelCategory: Number;
    validityFrom: Date;
    validityTo: Date;
    currencyFormat: String;
    adultOnSingleSharingBasis: String;
    adultOnTwinSharingBasis: String;
    adultOnTripleSharingBasis: String;
    childWithBed:String;
    childWithoutBed:String;
    Infant:String;
    minimumDepositAmount:Number
    minimumDepositPercent:Number
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageCosting Schema
export const PackageCostingSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    packageCategoryId: {
        type: Schema.Types.ObjectId
    },
    hotelCategory: {
        type: Number
    },
    validityFrom: {
        type: Date,
        required: false
    },
    validityTo: {
        type: Date,
        required: false
    },
    currencyFormat:{
        type:String
    },
    adultOnSingleSharingBasis:{
        type:String
    },
    adultOnTwinSharingBasis: {
        type:String
    },
    adultOnTripleSharingBasis: {
        type:String
    },
    childWithBed:{
        type:String
    },
    childWithoutBed:{
        type:String
    },
    Infant:{
        type:String
    },
    minimumDepositAmount:{
        type: Number
    },
    minimumDepositPercent:{
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: String,
        default: 'NA'
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'PackageCosting' });

PackageCostingSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageCostingModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageCostingModel = model<IPackageCostingModel>('PackageCosting', PackageCostingSchema);
// export default PackageCostingModel;