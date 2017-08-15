import { Document, Schema, Model, model } from 'mongoose';

// PackageSupplier Interface 
export interface IPackageSupplierModel extends Document {
    supplierName: string;
    supplierCode: string;
    supplierCompanyName: string;
    emailId: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
    phone1: string;
    phone2: string;
    mobile: string;
    fax: string;
    contactPerson: string;
    contactDesignation: string;
    suppServiceTypeId: string;
    remarks: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageSupplier Schema
export const PackageSupplierSchema = new Schema({
    supplierName: {
        type: String,
        unique: true,
        required: true
    },
    supplierCode: {
        type: String,
        unique: true,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
        city: {
        type: String,
        required: true
    },
        state: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone1: {
        type: String
    },
    phone2: {
        type: String
    },
    mobile: {
        type: String,
          required: true
    },
    fax: {
        type: String
    },
    contactPerson: {
        type: String,
          required: true
    },
    contactDesignation:{
        type: String
    },
    suppServiceType:{
        type: String
    },
    remarks:{
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
}, { collection: 'PackageSupplier' });

PackageSupplierSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageSupplierModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageSupplierModel = model<IPackageSupplierModel>('PackageSupplier', PackageSupplierSchema);
// export default PackageSupplier;