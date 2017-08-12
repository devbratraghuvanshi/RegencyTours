import { Document, Schema, model } from 'mongoose';

export const VOUCHER_TYPE = ["Company", "Agent"];
export const LOGO_TYPE = ["Company", "Agent"];

// CompanyInformation Interface 
export interface ICompanyInformationModel extends Document {
    userId:string;
    companyName: string;
    companyAddress: String;
    voucherType: String;
    logoType: String;
    pinCode: String;
    createdAt: Date;
    modifiedAt: Date;
};

//CompanyInformation Schema
export const CompanyInformationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        unique: true,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    voucherType: {
        type: String,
        enum: VOUCHER_TYPE,
        required: true
    },
    logoType: {
        type: String,
        enum: LOGO_TYPE,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'CompanyInformation' });

CompanyInformationSchema.pre('save', function (next) {
    if (this._doc) {
        let companyInfo = <ICompanyInformationModel>this._doc;

        let now = new Date();
        // if its new entry
        if (this.isNew) { companyInfo.createdAt = now;}

        companyInfo.modifiedAt = now;
        }
});


const CompanyInformation = model<ICompanyInformationModel>('CompanyInformation', CompanyInformationSchema);
export default CompanyInformation;