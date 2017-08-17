import { Document, Schema, Model, model } from 'mongoose';


// Package Interface 
export interface IPackageDescriptionModel extends Document {
    briefDescription: String;
    description: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageDescription Schema
export const PackageDescriptionSchema = new Schema({
    briefDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'PackageDescription' });

PackageDescriptionSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageDescriptionModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageDescriptionModel = model<IPackageDescriptionModel>('PackageDescription', PackageDescriptionSchema);
// export default PackageDescription;