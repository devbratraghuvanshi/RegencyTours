import { Document, Schema, Model, model } from 'mongoose';

// PackageTermAndCondition Interface 
export interface IPackageTermAndConditionModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    termsAndCondition: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageTermAndCondition Schema
export const PackageTermAndConditionSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    termsAndCondition: {
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
}, { collection: 'PackageTermAndCondition' });

PackageTermAndConditionSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageTermAndConditionModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageTermAndConditionModel = model<IPackageTermAndConditionModel>('PackageTermAndCondition', PackageTermAndConditionSchema);
// export default PackageTermAndConditionModel;