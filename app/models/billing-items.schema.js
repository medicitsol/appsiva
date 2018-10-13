const mongoose = require('mongoose');
// const OrderItem = require('./order-items.schema123');

const Schema = mongoose.Schema;

const BillingItemsSchema = new Schema({
    itemMasterId: String,
    itemCode: String,
    itemName: String,
    unit: String,
    expiryDate: String,
    quantity: Number,
    status: String
},
    {
        timestamps: true
    });

module.exports = BillingItemsSchema;






// const OrderItemsModel = mongoose.Schema({

//     items: [OrderItem]

// },
//     {
//         timestamps: true
//     });


// module.exports = mongoose.model('OrderItemsMaster', OrderItemsModel);