module.exports = (app) => {
    const expense = require('../controllers/expense.controller');

    // Create a new Note
    app.post('/expense', expense.create);

    // Retrieve all Notes
    app.get('/expense', expense.findAll);

    // // Retrieve a single Note with noteId
    // app.get('/order/:orderId', items.findOne);

    // // Update a Note with noteId
    // app.put('/order/change-order-status/:orderId', orders.orderMarkAsReceived);

    // // Update a Note with noteId
    // app.put('/order/edit-order/:orderId', orders.editOrder);

    // // Delete a Note with noteId
    // app.delete('/order/:orderId', items.delete);

    // Update a Note with noteId
    app.put('/expense/delete-expense/:expenseNo', expense.expenseDelete);
}