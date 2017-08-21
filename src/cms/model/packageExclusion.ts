import { Document, Schema, Model, model } from 'mongoose';

// PackageExclusion Interface 
export interface IPackageExclusionModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    sequenceNo: Number;
    briefDesc: string;
    description: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageExclusion Schema
export const PackageExclusionSchema = new Schema({
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
}, { collection: 'PackageExclusion' });

PackageExclusionSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageExclusionModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageExclusionModel = model<IPackageExclusionModel>('PackageExclusion', PackageExclusionSchema);
// export default PackageExclusionModel;