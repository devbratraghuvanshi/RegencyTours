import { Document, Schema,Model, model } from 'mongoose';

// Country Interface 
export interface ICountryModel extends Document {
    countryName: string;
    countryCode: string;
    createdAt: Date;
    modifiedAt: Date;
};

//Country Schema
export const CountrySchema = new Schema({
    countryName: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
    },
        createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'Countries' });

CountrySchema.pre('save', function(next) {
  if (this._doc) {
    let doc = <ICountryModel>this._doc;
    let now = new Date();
    if (!doc.createdAt) {
      doc.createdAt = now;
    }
    doc.modifiedAt = now;
  }
  next();
  return this;
});

export const CountryModel = model<ICountryModel>('Country', CountrySchema);
// export default Country;