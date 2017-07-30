//import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

// User Interface 
export interface IUser extends Document {
  name: string;
  userId: string;
  password: String; 
  email:String; 
  mobile:String;
};

//User Schema
export const UserSchema = new Schema({
    name:{ 
        type: String,
        required: true
    },
  userId: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    mobile:{
        type: String,
        required: false
    }
},{collection:'Users'});

const User = model<IUser>('User', UserSchema);
export default User;