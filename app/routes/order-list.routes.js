module.exports = (app) => {
    const orders = require('../controllers/oder.controller');

    // Create a new Note
    app.post('/order', orders.create);

    // Retrieve all Notes
    app.get('/order', orders.findAll);

    // // Retrieve a single Note with noteId
    // app.get('/order/:orderId', items.findOne);

    // Update a Note with noteId
    app.put('/order/change-order-status/:orderId', orders.orderMarkAsReceived);

    // Update a Note with noteId
    app.put('/order/edit-order/:orderId', orders.editOrder);

    // // Delete a Note with noteId
    // app.delete('/order/:orderId', items.delete);


    // mark orders as received
    app.post('/order/received', orders.received);



    // Update a Note with noteId for decrements
    app.put('/order/decrement-orders/:orderId', orders.decrementOrder);


    // Update a Note with noteId
    app.put('/delete-order/:orderId', orders.orderDelete);
}