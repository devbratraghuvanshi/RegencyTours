import { Document, Schema, Model, model } from 'mongoose';

// PackageCancellationRule Interface 
export interface IPackageCancellationRuleModel extends Document {
    //_id
    packageId: Schema.Types.ObjectId;
    condition: String;
    dayFrom: Number;
    dayTo: Number;
    currency: String;
    cancellationAmount: Number;
    cancellationPercent: Number;
    cancellationType:String;
    status: Boolean;
    createdBy: String;
    createdAt: Date;
    modifiedAt: Date;
};

//PackageCancellationRule Schema
export const PackageCancellationRuleSchema = new Schema({
    packageId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    condition: {
        type: String,
        enum:["Before","No Show"],
        required: true
    },
    dayFrom: {
        type: Number,
        required: true
    },
    dayTo: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    cancellationAmount: {
        type: Number,
        required: true
    },
    cancellationPercent: {
        type: Number,
        required: true
    },
    cancellationType:{
        type:String,
        default:"Per Booking"
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
}, { collection: 'PackageCancellationRule' });

PackageCancellationRuleSchema.pre('save', function (next) {
    if (this._doc) {
        let doc = <IPackageCancellationRuleModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export const PackageCancellationRuleModel = model<IPackageCancellationRuleModel>('PackageCancellationRule', PackageCancellationRuleSchema);
// export default PackageCancellationRuleModel;