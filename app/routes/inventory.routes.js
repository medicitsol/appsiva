module.exports = (app) => {
    const inventory = require('../controllers/inventory.controller');

    // Create a new Note
    // app.post('/billing', billing.create);

    // Retrieve all Notes
    app.get('/inventory/balance/:itemId', inventory.getBalanceQuantity);

    // Retrieve a single Note with noteId
    app.get('/inventory/movement/:itemCode', inventory.itemMovement);

    // // Update a Note with noteId
    // app.put('/order/change-order-status/:orderId', orders.orderMarkAsReceived);

    // // Update a Note with noteId
    // app.put('/order/edit-order/:orderId', orders.editOrder);

    // // Delete a Note with noteId
    // app.delete('/order/:orderId', items.delete);


    app.get('/inventory/get-expiry-dates/:itemCode', inventory.getAllExpiryDates);

    
        // get quantity by ex date
    app.post('/inventory/get-quantity-by-expiry-date', inventory.getItemQuantityByExpirydate);

}