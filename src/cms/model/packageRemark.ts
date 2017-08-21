import { Document, Schema, Model, model } from 'mongoose';

// PackageRemark Interface 
export interface IPackageRemarkModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    briefDesc: string;
    description: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageRemark Schema
export const PackageRemarkSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
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
}, { collection: 'PackageRemark' });

PackageRemarkSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageRemarkModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageRemarkModel = model<IPackageRemarkModel>('PackageRemark', PackageRemarkSchema);
// export default PackageRemarkModel;