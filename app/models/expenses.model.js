const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const ExpenseSchema = mongoose.Schema({

    voucherNo: Number,
    voucherDate: String,
    expenseCategory: String,
    expense: String,
    // amount: Number,

    drugsAmount: Number,
    salariesAmount: Number,
    teaClubAmount: Number,
    stationeriesAmount: Number,
    utilityBillsAmount: Number,
    repairsAmount: Number,
    capexAmount: Number,
    othersAmount: Number,

    expenseNote: String,
    status: String

},
    {
        timestamps: true
    });


ExpenseSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('ExpenseSchema', ExpenseSchema);