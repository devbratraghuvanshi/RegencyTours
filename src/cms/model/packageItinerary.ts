import { Document, Schema, Model, model } from 'mongoose';

// PackageItinerary Interface 
export interface IPackageItineraryModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    imageId: Schema.Types.ObjectId;
    day: string;
    cityId: Schema.Types.ObjectId;
    briefDesc: string;
    description: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageItinerary Schema
export const PackageItinerarySchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    imageId: {
        type: Schema.Types.ObjectId
    },
    day: {
        type: String,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    briefDesc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
}, { collection: 'PackageItinerary' });

PackageItinerarySchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageItineraryModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageItineraryModel = model<IPackageItineraryModel>('PackageItinerary', PackageItinerarySchema);
// export default PackageItineraryModel;