import * as bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

// User Interface 
export interface IUserModel extends Document {
  name: string;
  userId: string;
  password: String; 
  email:String; 
  mobile:String;
  comparePassword(password : string, callback: Function): void ;
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

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const User = model<IUserModel>('User', UserSchema);
export default User;