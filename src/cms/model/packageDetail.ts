import { Document, Schema, Model, model } from 'mongoose';

import { IPackageSupplierModel, PackageSupplierSchema } from './packageSupplier';
import { IPackageCategoryModel, PackageCategorySchema } from './packageCategory';
import { IPackageComponentModel, PackageComponentSchema } from './packageComponent';
import { ICityModel, CitySchema } from './city';

// PackageDetail Interface 
export interface IPackageDetailModel extends Document {
    categoryId: Schema.Types.ObjectId;
    name: String;
    code: String;
    suppliers: [Schema.Types.ObjectId];
    components: [ Schema.Types.ObjectId];
    cities: [Schema.Types.ObjectId];
    remarks: String;
    status: Boolean;
};

//PackageDetail Schema
export const PackageDetailSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref:'PackageCategory',
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    suppliers: {
        type: [Schema.Types.ObjectId],
        ref:'PackageSupplier',
        required: true
    },
    components: {
        type: [Schema.Types.ObjectId],
        ref:'PackageComponent',
        required: true
    },
    cities: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const PackageDetailModel = model<IPackageDetailModel>('PackageDetail', PackageDetailSchema);
// export default PackageDetail;