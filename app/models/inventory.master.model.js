const mongoose = require('mongoose');

const InventoryMasterSchema = mongoose.Schema({

    item_id: String,
    itemCode: String,
    itemName: String,
    invDocType: String,
    invRef: String,
    itemExpiryDate: String,
    itemQuantity: Number,
    itemFreeQuantity: Number,
    itemBillQuantity: Number,
    itemTotalQuantity: Number

},
    {
        timestamps: true
    });




module.exports = mongoose.model('InventoryMaster', InventoryMasterSchema);