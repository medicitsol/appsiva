const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const SupplierMaster = mongoose.Schema({

    supplierCode: Number,
    supplierName: String,
    contactNo: String,
    email: String,
    status: String
},
    {
        timestamps: true
    });

SupplierMaster.plugin(mongoosePaginate);

module.exports = mongoose.model('SupplierMaster', SupplierMaster);