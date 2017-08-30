import { Document, Schema, Model, model } from 'mongoose';

// PackageDepartureDates Interface 
export interface IPackageDepartureDatesModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    monthName: string;
    date:Date;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageDepartureDates Schema
export const PackageDepartureDatesSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    monthName: {
        type: String,
        enum:["January","February" ,"March" ,"April","May" ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"]
    },
    date: {
        type: Date,
        required: true,
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
}, { collection: 'PackageDepartureDates' });

PackageDepartureDatesSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageDepartureDatesModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageDepartureDatesModel = model<IPackageDepartureDatesModel>('PackageDepartureDates', PackageDepartureDatesSchema);
// export default PackageDepartureDatesModel;