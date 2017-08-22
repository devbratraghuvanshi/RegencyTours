import { Document, Schema, Model, model } from 'mongoose';

// PackageDestination Interface 
export interface IPackageDestinationModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    cityId: Schema.Types.ObjectId;
    factId: Schema.Types.ObjectId;
    imageId: Schema.Types.ObjectId;
    description: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageDestination Schema
export const PackageDestinationSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    factId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    imageId: {
        type: Schema.Types.ObjectId
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
}, { collection: 'PackageDestination' });

PackageDestinationSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageDestinationModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageDestinationModel = model<IPackageDestinationModel>('PackageDestination', PackageDestinationSchema);
// export default PackageDestinationModel;