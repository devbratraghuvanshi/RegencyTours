import { Document, Schema, model } from 'mongoose';

export const VOUCHER_TYPE = ["Company", "Agent"];
export const LOGO_TYPE = ["Company", "Agent"];

// BusinessInformation Interface 
export interface IBusinessInformationModel extends Document {
    companyName: string;
    userName: String;
    accountId: String;
    balanceCredit: number;
    logoPath: String;
    createdAt: Date;
    modifiedAt: Date;
};

//CompanyInformation Schema
export const BusinessInformationSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    balanceCredit: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'BusinessInformation' });

BusinessInformationSchema.pre('save', function (next) {
    if (this._doc) {
        let companyInfo = <IBusinessInformationModel>this._doc;

        let now = new Date();
        // if its new entry
        if (this.isNew) { companyInfo.createdAt = now;}

        companyInfo.modifiedAt = now;
        }
});


const BusinessInformation = model<IBusinessInformationModel>('BusinessInformation', BusinessInformationSchema);
export default BusinessInformation;