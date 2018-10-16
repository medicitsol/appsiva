const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const ItemMasterSchema = mongoose.Schema({

    // itemCode: Number,
    itemCode: String,
    itemName: String,
    reorderLevel: Number,
    orderQuantity: Number,
    unit: String,
    price: String,
    shortExpiry: Number,
    status: String

},
    {
        timestamps: true
    });


ItemMasterSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('ItemMaster', ItemMasterSchema);