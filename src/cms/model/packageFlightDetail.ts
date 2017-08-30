import { Document, Schema, Model, model } from 'mongoose';

// PackageFlightDetail Interface 
export interface IPackageFlightDetailModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    airLine: string;
    oneWay: string;
    twoWay: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageFlightDetail Schema
export const PackageFlightDetailSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    airLine: {
        type: String,
        required: true
    },
    oneWay: {
        type: String,
        required: true
    },
    twoWay: {
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
}, { collection: 'PackageFlightDetail' });

PackageFlightDetailSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageFlightDetailModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageFlightDetailModel = model<IPackageFlightDetailModel>('PackageFlightDetail', PackageFlightDetailSchema);
// export default PackageFlightDetailModel;