import { Document, Schema, Model, model } from 'mongoose';

// PackageImage Interface 
export interface IPackageImageModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    imageUrl: string;
    imageTag: string;
    attribute: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageImage Schema
export const PackageImageSchema = new Schema({
    packageId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        unique: true,
        required: true
    },
    imageTag: {
        type: String,
        required: true
    },
    attribute: {
        type: String,
        required: true,
        enum:["Default","VirtualTour"]
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
}, { collection: 'PackageImage' });

PackageImageSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageImageModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageImageModel = model<IPackageImageModel>('PackageImage', PackageImageSchema);
// export default PackageImageModel;