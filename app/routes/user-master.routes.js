module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/user', users.create);

    // Retrieve all users
    app.get('/user', users.findAll, (req, res) =>{

    });

    // Retrieve a single Note with noteId
    app.post('/user/login', users.login);

    // // Update a Note with noteId
    // app.put('/items/:itemId', items.update);

    // // Update a Note with noteId
    // app.put('/deleteitem/:itemId', items.itemdelete);

    // // Delete a Note with noteId
    // app.delete('/items/:itemId', items.delete);
}