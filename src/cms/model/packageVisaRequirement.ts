import { Document, Schema, Model, model } from 'mongoose';

// PackageVisaRequirement Interface 
export interface IPackageVisaRequirementModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    description: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageVisaRequirement Schema
export const PackageVisaRequirementSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
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
}, { collection: 'PackageVisaRequirement' });

PackageVisaRequirementSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageVisaRequirementModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageVisaRequirementModel = model<IPackageVisaRequirementModel>('PackageVisaRequirement', PackageVisaRequirementSchema);
// export default PackageVisaRequirementModel;