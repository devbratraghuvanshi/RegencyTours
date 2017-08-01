import * as bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

// UserCredential Interface 
export interface IUserCredentialModel extends Document {
    userId: string;
    password: String;
    createdAt: Date;
    modifiedAt: Date;
    comparePassword(password: string, callback: Function): void;
};


//UserCredential Schema
export const UserCredentialSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    password: {
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
}, { collection: 'CredentialSchemas' });

UserCredentialSchema.pre('save', function (next) {
    if (this._doc) {
        let userCredential = <IUserCredentialModel>this._doc;

        // if password is modified of its new entry
        if (this.isModified('password') || this.isNew) {

            // set modified date and created
            let now = new Date();
            userCredential.modifiedAt = now;
            if (!userCredential.createdAt) {
                userCredential.createdAt = now;
            }

            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(userCredential.password, salt, function (err, hash) {
                    if (err) {
                        return next(err);
                    }
                    userCredential.password = hash;
                    next();
                });
            });
        }
    }
});

UserCredentialSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

const UserCredential = model<IUserCredentialModel>('UserCredential', UserCredentialSchema);
export default UserCredential;