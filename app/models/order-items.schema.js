const mongoose = require('mongoose');
// const OrderItem = require('./order-items.schema123');

const Schema = mongoose.Schema;

const OrderItemsSchema = new Schema({
    itemMasterId:String,
    itemCode: String,
    itemName: String,
    order: Number,
    freeIssue: Number,
    expiryDate: String,
    remark: String,
    unit:String,
    totalQty:Number,
    status: String
},
    {
        timestamps: true
    });

module.exports = OrderItemsSchema;






// const OrderItemsModel = mongoose.Schema({

//     items: [OrderItem]

// },
//     {
//         timestamps: true
//     });


// module.exports = mongoose.model('OrderItemsMaster', OrderItemsModel);