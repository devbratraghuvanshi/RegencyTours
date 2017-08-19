import { Document, Schema, Model, model } from 'mongoose';


// Package Interface 
export interface IPackageDescriptionModel extends Document {
    briefDescription: String;
    description: String;
};

//PackageDescription Schema
export const PackageDescriptionSchema = new Schema({
    briefDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const PackageDescriptionModel = model<IPackageDescriptionModel>('PackageDescription', PackageDescriptionSchema);
// export default PackageDescription;