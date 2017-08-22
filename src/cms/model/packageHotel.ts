import { Document, Schema, Model, model } from 'mongoose';

// PackageHotel Interface 
export interface IPackageHotelModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    cityId: Schema.Types.ObjectId;
    category: Number;
    hotelName: String;
    imageId: Schema.Types.ObjectId;
    description: String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageHotel Schema
export const PackageHotelSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    imageId: {
        type: Schema.Types.ObjectId
    },
    description: {
        type: String
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
}, { collection: 'PackageHotel' });

PackageHotelSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageHotelModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageHotelModel = model<IPackageHotelModel>('PackageHotel', PackageHotelSchema);
// export default PackageHotelModel;