import { Document, Schema, Model, model } from 'mongoose';


// Package Allocation  Interface 
export interface IPackageAllocationModel extends Document {
    city: String;
    depDate: Date;
    totalAllocation: Number;
    sold: Number;
    bookBeforeDays: Number;
    createdAt: Date;
    modifiedAt: Date;
};

//Package Allocation Schema
export const PackageAllocationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    depDate: {
        type: Date,
        required: true
    },
    totalAllocation: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    bookBeforeDays: {
        type: Number,
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
}, { collection: 'PackageAllocation' });

PackageAllocationSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageAllocationModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageAllocationModel = model<IPackageAllocationModel>('PackageAllocation', PackageAllocationSchema);
// export default PackageAllocation;