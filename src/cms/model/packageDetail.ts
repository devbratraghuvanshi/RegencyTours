import { Document, Schema, Model, model } from 'mongoose';

import { IPackageSupplierModel, PackageSupplierSchema } from './packageSupplier';
import { IPackageCategoryModel, PackageCategorySchema } from './packageCategory';
import { IPackageComponentModel, PackageComponentSchema } from './packageComponent';
import { ICityModel, CitySchema } from './city';

// PackageDetail Interface 
export interface IPackageDetailModel extends Document {
    packageCategory: IPackageCategoryModel;
    packageName: String;
    packageCode: String;
    supplier: [IPackageSupplierModel];
    component: [IPackageComponentModel];
    destCity: [ICityModel];
    remarks: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageDetail Schema
export const PackageDetailSchema = new Schema({
    packageCategory: {
        type: PackageCategorySchema,
        required: true
    },
    packageName: {
        type: String,
        unique: true,
        required: true
    },
    packageCode: {
        type: String,
        unique: true,
        required: true
    },
    supplier: {
        type: [PackageSupplierSchema],
        required: true
    },
    component: {
        type: [PackageComponentSchema],
        required: true
    },
    destCity: {
        type: [CitySchema],
        required: true
    },
    remarks: {
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
}, { collection: 'PackageDetail' });

PackageDetailSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageDetailModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageDetailModel = model<IPackageDetailModel>('PackageDetail', PackageDetailSchema);
// export default PackageDetail;