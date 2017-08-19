import { Document, Schema, Model, model } from 'mongoose';

import { IPackageAllocationModel } from './packageAllocation';
import { IPackageDescriptionModel, PackageDescriptionSchema } from './packageDescription';
import { IPackageValidityModel, PackageValiditySchema } from './packageValidity';
import { IPackageDetailModel, PackageDetailSchema } from './packageDetail';

// Package Interface 
export interface IPackageModel extends Document {
    detail : IPackageDetailModel;
    validity: IPackageValidityModel;
    description: IPackageDescriptionModel;
    allocations: [Schema.Types.ObjectId];
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//Package Schema
export const PackageSchema = new Schema({
    detail: {
        type: PackageDetailSchema,
        required: true
    },
    validity: {
        type: PackageValiditySchema,
        required: true
    },
    description: {
        type: PackageDescriptionSchema,
        required: true
    },
    allocations:{
        type:[Schema.Types.ObjectId],
        ref:'PackageAllocation'
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
}, { collection: 'Package' });

PackageSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageModel = model<IPackageModel>('Package', PackageSchema);
// export default Package;