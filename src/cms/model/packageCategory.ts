import { Document, Schema, Model, model } from 'mongoose';

// PackageCategory Interface 
export interface IPackageCategoryModel extends Document {
    categoryName: string;
    categoryCode: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageCategory Schema
export const PackageCategorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    },
    categoryCode: {
        type: String,
        unique: true,
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
}, { collection: 'PackageCategory' });

PackageCategorySchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageCategoryModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageCategoryModel = model<IPackageCategoryModel>('PackageCategory', PackageCategorySchema);
// export default PackageCategory;