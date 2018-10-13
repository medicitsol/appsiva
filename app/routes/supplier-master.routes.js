module.exports = (app) => {
    const supplier = require('../controllers/supplier.controller.js');

    // Create a new Note
    app.post('/supplier', supplier.create);

    // Retrieve all Notes
    app.get('/supplier', supplier.findAll);

    // Retrieve a single Note with noteId
    app.get('/supplier/:supplierId', supplier.findOne);

    // Update a Note with noteId
    app.put('/supplier/:supplierId', supplier.update);

    // Update a Note with noteId
    app.put('/deletesupplier/:supplierId', supplier.deletesupplier);

    // Delete a Note with noteId
    app.delete('/supplier/:supplierId', supplier.delete);
}