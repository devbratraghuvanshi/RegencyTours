import { Document, Schema, Model, model } from 'mongoose';

// PackagePaymentDetail Interface 
export interface IPackagePaymentDetailModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    description: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackagePaymentDetail Schema
export const PackagePaymentDetailSchema = new Schema({
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
}, { collection: 'PackagePaymentDetail' });

PackagePaymentDetailSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackagePaymentDetailModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackagePaymentDetailModel = model<IPackagePaymentDetailModel>('PackagePaymentDetail', PackagePaymentDetailSchema);
// export default PackagePaymentDetailModel;