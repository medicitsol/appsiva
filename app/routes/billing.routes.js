module.exports = (app) => {
    const billing = require('../controllers/billing.controller');

    // Create a new Note
    app.post('/billing', billing.create);

    // Retrieve all Notes
    app.get('/billing', billing.findAll);


    // Retrieve a single Note with noteId
    app.get('/billing/get-bill/:billNo', billing.getSingleBill);

    // // Update a Note with noteId
    // app.put('/order/change-order-status/:orderId', orders.orderMarkAsReceived);

    // Update a Note with noteId
    app.put('/billing/edit-bill/:billId', billing.editBill);

    // // Delete a Note with noteId
    // app.delete('/order/:orderId', items.delete);

    // Update a Note with noteId
    app.put('/billing/delete-bill/:billNo', billing.billDelete);
}