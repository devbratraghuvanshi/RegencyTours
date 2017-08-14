import { Document, Schema, Model, model } from 'mongoose';

// PackageComponent Interface 
export interface IPackageComponentModel extends Document {
    componentName: string;
    componentCode: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageComponent Schema
export const PackageComponentSchema = new Schema({
    componentName: {
        type: String,
        unique: true,
        required: true
    },
    componentCode: {
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
}, { collection: 'PackageComponent' });

PackageComponentSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageComponentModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageComponentModel = model<IPackageComponentModel>('PackageComponent', PackageComponentSchema);
// export default PackageComponent;