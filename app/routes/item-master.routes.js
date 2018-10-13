module.exports = (app) => {
    const items = require('../controllers/item.controller.js');

    // Create a new Note
    app.post('/items', items.create);

    // Retrieve all Notes
    app.get('/items', items.findAll);

    // Retrieve a single Note with noteId
    app.get('/items/:itemId', items.findOne);

    // Update a Note with noteId
    app.put('/items/:itemId', items.update);

    // Update a Note with noteId
    app.put('/deleteitem/:itemId', items.itemdelete);

    // Delete a Note with noteId
    app.delete('/items/:itemId', items.delete);
}