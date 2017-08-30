import { Document, Schema, Model, model } from 'mongoose';

// PackageAddOnTours Interface 
export interface IPackageAddOnToursModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    tourName: string;
    tourCost: Number;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageAddOnTours Schema
export const PackageAddOnToursSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tourName: {
        type: String,
        required: true
    },
    tourCost: {
        type: Number,
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
}, { collection: 'PackageAddOnTours' });

PackageAddOnToursSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageAddOnToursModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageAddOnToursModel = model<IPackageAddOnToursModel>('PackageAddOnTours', PackageAddOnToursSchema);
// export default PackageAddOnToursModel;