import { Document, Schema,Model, model } from 'mongoose';

// City Interface 
export interface ICityModel extends Document {
    cityName: string;
    cityCode: string;
    state:string;
    lat:String;
    lon: String;
    createdAt: Date;
    modifiedAt: Date;
};

//City Schema
export const CitySchema = new Schema({
    cityName: {
        type: String,
        required: true
    },
    cityCode: {
        type: String,
    },
    state:{
        type: String,
        required: true
    },
    lat: {
        type: String
    },
    lon: {
        type: String
    },
        createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'Cities' });

CitySchema.pre('save', function(next) {
  if (this._doc) {
    let doc = <ICityModel>this._doc;
    let now = new Date();
    if (!doc.createdAt) {
      doc.createdAt = now;
    }
    doc.modifiedAt = now;
  }
  next();
  return this;
});

export const CityModel = model<ICityModel>('City', CitySchema);
// export default City;