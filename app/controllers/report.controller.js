const Item = require('../models/item-master.model.js');
const Inventory = require('../models/inventory.master.model');
const Billing = require('../models/billing.model');
const Expense = require('../models/expenses.model');
const mergeByKey = require('array-merge-by-key');



// Retrieve and return all items from the database.
exports.getBillingRevenueReport = (req, res) => {


    var today = new Date();
    var todayDate = today.toISOString();

    var reportType = req.params.reportType
    var dateFilter = {};


    if (reportType == 1) {

        dateFilter = { status: { $ne: 'DELETED' } }

    } else if (reportType == 2) {


        var lastWeek = new Date();
        var lastWeekDate;
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek.setUTCHours(0, 0, 0, 0);
        lastWeekDate = lastWeek.toISOString();

        dateFilter = { billDate: { $gte: lastWeekDate, $lt: todayDate }, status: { $ne: 'DELETED' } }

    } else if (reportType == 3) {
        var date = new Date();
        var monthToDate;
        var monthFirst = new Date(date.getFullYear(), date.getMonth(), 2);
        monthFirst.setUTCHours(0, 0, 0, 0);
        monthToDate = monthFirst.toISOString();

        dateFilter = { billDate: { $gte: monthToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }


    } else if (reportType == 4) {

        var yearToDate;
        var yearFirst = new Date(new Date().getFullYear(), 0, 2);
        yearFirst.setUTCHours(0, 0, 0, 0);
        yearToDate = yearFirst.toISOString();

        dateFilter = { billDate: { $gte: yearToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }
    }

    var responsePayload = []


    var total = 0;

    Billing.aggregate(


        [{
            $match: dateFilter,
        }, {
            $group: {
                _id: "$billDate",
                consultationFee: { $sum: "$consultationFee" },
                pharmaceuticalFee: { $sum: "$pharmaceuticalFee" },
                laboratoryFee: { $sum: "$laboratoryFee" },
                ECGFee: { $sum: "$ECGFee" },
                CBSFee: { $sum: "$CBSFee" },
                procedureFee: { $sum: "$procedureFee" },
                otherFee: { $sum: "$otherFee" }
            }
        }])

        .then(bill => {

            bill.forEach(element => {

                total = element.consultationFee + element.pharmaceuticalFee + element.laboratoryFee + element.ECGFee + element.CBSFee + element.procedureFee + element.otherFee;


                var responseWithTotal = {
                    billDate: element._id,
                    consultationFee: element.consultationFee,
                    pharmaceuticalFee: element.pharmaceuticalFee,
                    laboratoryFee: element.laboratoryFee,
                    ECGFee: element.ECGFee,
                    CBSFee: element.CBSFee,
                    procedureFee: element.procedureFee,
                    otherFee: element.otherFee,
                    totalFee: total
                }

                responsePayload.push(responseWithTotal)



            });

            res.send(responsePayload);



        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving bills."
            });
        });

};














// Retrieve and return all items from the database.
exports.getExpenseReport = (req, res) => {

    var today = new Date();
    var todayDate = today.toISOString();

    var reportType = req.params.reportType
    var dateFilter = {};


    if (reportType == 1) {

        dateFilter = { status: { $ne: 'DELETED' } }

    } else if (reportType == 2) {


        var lastWeek = new Date();
        var lastWeekDate;
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek.setUTCHours(0, 0, 0, 0);
        lastWeekDate = lastWeek.toISOString();

        dateFilter = { voucherDate: { $gte: lastWeekDate, $lt: todayDate }, status: { $ne: 'DELETED' } }

    } else if (reportType == 3) {
        var date = new Date();
        var monthToDate;
        var monthFirst = new Date(date.getFullYear(), date.getMonth(), 2);
        monthFirst.setUTCHours(0, 0, 0, 0);
        monthToDate = monthFirst.toISOString();

        dateFilter = { voucherDate: { $gte: monthToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }


    } else if (reportType == 4) {

        var yearToDate;
        var yearFirst = new Date(new Date().getFullYear(), 0, 2);
        yearFirst.setUTCHours(0, 0, 0, 0);
        yearToDate = yearFirst.toISOString();

        dateFilter = { voucherDate: { $gte: yearToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }
    }

    var responsePayload = []


    var total = 0;

    Expense.aggregate(


        [{
            $match: dateFilter,
        }, {
            $group: {
                _id: "$voucherDate",

                drugsAmount: { $sum: "$drugsAmount" },
                salariesAmount: { $sum: "$salariesAmount" },
                teaClubAmount: { $sum: "$teaClubAmount" },
                stationeriesAmount: { $sum: "$stationeriesAmount" },
                utilityBillsAmount: { $sum: "$utilityBillsAmount" },
                repairsAmount: { $sum: "$repairsAmount" },
                capexAmount: { $sum: "$capexAmount" },
                othersAmount: { $sum: "$othersAmount" },
            }
        }])


        .then(expense => {




            expense.forEach(element => {

                total = element.drugsAmount + element.salariesAmount + element.teaClubAmount + element.stationeriesAmount + element.utilityBillsAmount + element.repairsAmount + element.capexAmount + element.othersAmount;


                var responseWithTotal = {
                    voucherDate: element._id,
                    drugsAmount: element.drugsAmount,
                    salariesAmount: element.salariesAmount,
                    teaClubAmount: element.teaClubAmount,
                    stationeriesAmount: element.stationeriesAmount,
                    utilityBillsAmount: element.utilityBillsAmount,
                    repairsAmount: element.repairsAmount,
                    capexAmount: element.capexAmount,
                    othersAmount: element.othersAmount,
                    totalExpense: total
                }

                responsePayload.push(responseWithTotal)



            });

            res.send(responsePayload);



            // res.send(expense);



        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving bills."
            });
        });

};





// Retrieve and return all items from the database.
exports.getProfitReport = (req, res) => {

    var today = new Date();
    var todayDate = today.toISOString();

    var reportType = req.params.reportType
    var dateFilter = {};


    if (reportType == 1) {

        dateFilter = { status: { $ne: 'DELETED' } }

    } else if (reportType == 2) {


        var lastWeek = new Date();
        var lastWeekDate;
        lastWeek.setDate(lastWeek.getDate() - 7);
        lastWeek.setUTCHours(0, 0, 0, 0);
        lastWeekDate = lastWeek.toISOString();

        dateFilter = { voucherDate: { $gte: lastWeekDate, $lt: todayDate }, status: { $ne: 'DELETED' } }

    } else if (reportType == 3) {
        var date = new Date();
        var monthToDate;
        var monthFirst = new Date(date.getFullYear(), date.getMonth(), 2);
        monthFirst.setUTCHours(0, 0, 0, 0);
        monthToDate = monthFirst.toISOString();

        dateFilter = { voucherDate: { $gte: monthToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }


    } else if (reportType == 4) {

        var yearToDate;
        var yearFirst = new Date(new Date().getFullYear(), 0, 2);
        yearFirst.setUTCHours(0, 0, 0, 0);
        yearToDate = yearFirst.toISOString();

        dateFilter = { voucherDate: { $gte: yearToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }
    }

    var expenseResponse = [];


    var totalAmountOfExpense = 0;

    Expense.aggregate(

        [
            {
                $match: dateFilter,
            },

            {
                $group: {
                    _id: '$voucherDate',

                    drugsAmount: { $sum: "$drugsAmount" },
                    salariesAmount: { $sum: "$salariesAmount" },
                    teaClubAmount: { $sum: "$teaClubAmount" },
                    stationeriesAmount: { $sum: "$stationeriesAmount" },
                    utilityBillsAmount: { $sum: "$utilityBillsAmount" },
                    repairsAmount: { $sum: "$repairsAmount" },
                    capexAmount: { $sum: "$capexAmount" },
                    othersAmount: { $sum: "$othersAmount" }

                }

            }])

        .then(expense => {

            expense.forEach(element => {

                totalAmountOfExpense = element.drugsAmount + element.salariesAmount + element.teaClubAmount + element.stationeriesAmount + element.utilityBillsAmount + element.repairsAmount + element.capexAmount + element.othersAmount;


                var totalExpense = {
                    date: element._id,
                    expense: totalAmountOfExpense,
                    revenue: 0
                }

                expenseResponse.push(totalExpense);


            });



            var revenueResponse = [];
            var totalRevenue = 0;
            // *****************************************************************************







            // var today = new Date();
            // var todayDate = today.toISOString();

            // var reportType = req.params.reportType
            var billDateFilter = {};


            if (reportType == 1) {

                billDateFilter = { status: { $ne: 'DELETED' } }

            } else if (reportType == 2) {


                var billLastWeek = new Date();
                var billLastWeekDate;
                billLastWeek.setDate(billLastWeek.getDate() - 7);
                billLastWeek.setUTCHours(0, 0, 0, 0);
                billLastWeekDate = billLastWeek.toISOString();

                billDateFilter = { billDate: { $gte: billLastWeekDate, $lt: todayDate }, status: { $ne: 'DELETED' } }

            } else if (reportType == 3) {
                var billDate = new Date();
                var billMonthToDate;
                var billMonthFirst = new Date(billDate.getFullYear(), billDate.getMonth(), 2);
                billMonthFirst.setUTCHours(0, 0, 0, 0);
                billMonthToDate = billMonthFirst.toISOString();

                billDateFilter = { billDate: { $gte: billMonthToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }


            } else if (reportType == 4) {

                var billYearToDate;
                var billYearFirst = new Date(new Date().getFullYear(), 0, 2);
                billYearFirst.setUTCHours(0, 0, 0, 0);
                billYearToDate = billYearFirst.toISOString();

                billDateFilter = { billDate: { $gte: billYearToDate, $lt: todayDate }, status: { $ne: 'DELETED' } }
            }



            expenseResponse.forEach(expensePayload => {


                Billing.aggregate(

                    [
                        {
                            $match: billDateFilter,
                        },

                        {

                            $group: {
                                _id: "$billDate",
                                consultationFee: { $sum: "$consultationFee" },
                                pharmaceuticalFee: { $sum: "$pharmaceuticalFee" },
                                laboratoryFee: { $sum: "$laboratoryFee" },
                                ECGFee: { $sum: "$ECGFee" },
                                CBSFee: { $sum: "$CBSFee" },
                                procedureFee: { $sum: "$procedureFee" },
                                otherFee: { $sum: "$otherFee" }
                            }

                        }])

                    .then(revenue => {


                        revenue.forEach(element => {

                            totalRevenue = element.consultationFee + element.pharmaceuticalFee + element.laboratoryFee + element.ECGFee + element.CBSFee + element.procedureFee + element.otherFee;


                            var totalExpense = {
                                date: element._id,
                                expense: 0,
                                revenue: totalRevenue
                            }
                            expenseResponse.push(totalExpense)

                        });



                        var revenueReportPayload = {
                            expense: expenseResponse,
                            revenue: revenueResponse
                        }



                        // helper find function
                        function getByDate(list, date) {
                            function dateMatches(item) {
                                return item.date === date
                            }
                            return list.find(dateMatches)
                        }

                        // get combined result
                        var combinedArray = []

                        expenseResponse.forEach(function (item) {
                            var previousMatch = getByDate(combinedArray, item.date)
                            if (previousMatch) {
                                previousMatch.expense += item.expense;
                                previousMatch.revenue += item.revenue;

                            }
                            else {
                                combinedArray.push({
                                    date: item.date,
                                    expense: item.expense,
                                    revenue: item.revenue
                                })
                            }
                        });




                        var finalProfit = [];

                        combinedArray.forEach(fin => {

                            var final = {
                                date: fin.date,
                                expense: fin.expense,
                                revenue: fin.revenue,
                                profit: fin.revenue - fin.expense
                            }

                            finalProfit.push(final)


                        });

                        res.send(finalProfit);




                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving bills."
                        });
                    });

            });


        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving bills."
            });
        });



};