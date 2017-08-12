import * as bcrypt from 'bcrypt';
import { Document, Schema,Model, model } from 'mongoose';
import * as  UserCredential from './userCredential'

// User Interface 
export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    userId: string;
    email: String;
    mobile: String;
    createdAt: Date;
    modifiedAt: Date;
};

//User Schema
export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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


export const UserModel = model<IUserModel>('User', UserSchema);
// export default User;