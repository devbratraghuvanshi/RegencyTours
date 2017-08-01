import * as bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';
import * as  UserCredential from './userCredential'

// User Interface 
export interface IUserModel extends Document {
    name: string;
    userId: string;
    email: String;
    mobile: String;
    createdAt: Date;
    modifiedAt: Date;
};


//User Schema
export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
        createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'Users' });

UserSchema.pre('save', function(next) {
  if (this._doc) {
    let doc = <IUserModel>this._doc;
    let now = new Date();
    if (!doc.createdAt) {
      doc.createdAt = now;
    }
    doc.modifiedAt = now;
  }
  next();
  return this;
});


const User = model<IUserModel>('User', UserSchema);
export default User;