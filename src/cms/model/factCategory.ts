import { Document, Schema, Model, model } from 'mongoose';

// FactCategory Interface 
export interface IFactCategoryModel extends Document {
    factType: string;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//FactCategory Schema
export const FactCategorySchema = new Schema({
    factType: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: String,
        default: 'NA'
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, { collection: 'FactCategory' });

FactCategorySchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IFactCategoryModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const FactCategoryModel = model<IFactCategoryModel>('FactCategory', FactCategorySchema);
// export default FactCategory;