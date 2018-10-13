module.exports = (app) => {
    const report = require('../controllers/report.controller');

    // // Create a new Note
    // app.post('/billing', billing.create);

    // Retrieve revenue report
    app.get('/billing-revenue-report/:reportType', report.getBillingRevenueReport);

    // Retrieve expense report
    app.get('/expense-report/:reportType', report.getExpenseReport);

    // Retrieve expense report
    app.get('/profit-report/:reportType', report.getProfitReport);

    // // Retrieve a single Note with noteId
    // app.get('/order/:orderId', items.findOne);

    // // Update a Note with noteId
    // app.put('/order/change-order-status/:orderId', orders.orderMarkAsReceived);

    // // Update a Note with noteId
    // app.put('/order/edit-order/:orderId', orders.editOrder);

    // // Delete a Note with noteId
    // app.delete('/order/:orderId', items.delete);
}