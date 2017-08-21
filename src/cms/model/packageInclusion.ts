import { Document, Schema, Model, model } from 'mongoose';

// PackageInclusion Interface 
export interface IPackageInclusionModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    sequenceNo: Number;
    specType: boolean;
    briefDesc: string;
    description: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageInclusion Schema
export const PackageInclusionSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    sequenceNo: {
        type: Number,
    },
    specType: {
        type: Boolean
    },
    briefDesc: {
        type: String,
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
}, { collection: 'PackageInclusion' });

PackageInclusionSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageInclusionModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageInclusionModel = model<IPackageInclusionModel>('PackageInclusion', PackageInclusionSchema);
// export default PackageInclusionModel;