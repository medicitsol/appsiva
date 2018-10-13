const mongoose = require('mongoose');
const OrderItem = require('./order-items.schema');
var mongoosePaginate = require('mongoose-paginate');

const OrderSchema = mongoose.Schema({

    orderId: Number,
    orderDate: String,
    supplierName: String,
    supplierId: String,
    orderNote: String,
    status: String,
    items: [OrderItem]
},
    {
        timestamps: true
    });


OrderSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('OrderSchema', OrderSchema);