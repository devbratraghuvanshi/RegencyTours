import { Document, Schema, model } from 'mongoose';

export const PARTNER_CATEGORY = ["Silver", "Gold","Platinum"];

// UserInformation Interface 
export interface IUserInformationModel extends Document {
    userId:string;
    businessType: string;
    partnerCategory: String;
    state: String;
    panNo: String;
    createdAt: Date;
    modifiedAt: Date;
};

//UserInformation Schema
export const UserInformationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    businessType: {
        type: String,
        required: true
    },
    partnerCategory: {
        type: String,
        required: true
    },
    panNo: {
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
}, { collection: 'UserInformation' });

UserInformationSchema.pre('save', function (next) {
    if (this._doc) {
        let companyInfo = <IUserInformationModel>this._doc;

        let now = new Date();
        // if its new entry
        if (this.isNew) { companyInfo.createdAt = now;}

        companyInfo.modifiedAt = now;
        }
});

const CompanyInformation = model<IUserInformationModel>('CompanyInformation', UserInformationSchema);
export default CompanyInformation;