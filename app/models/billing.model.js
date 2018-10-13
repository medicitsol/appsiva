const mongoose = require('mongoose');
const BillingItem = require('./billing-items.schema');
var mongoosePaginate = require('mongoose-paginate');

const BillingItemSchema = mongoose.Schema({

    billingNumber: Number,
    patientName: String,
    patientGender: String,
    patientAge: Number,
    billDate: String,
    contactNumber: String,
    items: [BillingItem],

    consultationFee: Number,
    pharmaceuticalFee: Number,
    laboratoryFee: Number,
    ECGFee: Number,
    CBSFee: Number,
    procedureFee: Number,
    otherFee: Number,
    status:String

},
    {
        timestamps: true
    });


BillingItemSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('BillingItemSchema', BillingItemSchema);