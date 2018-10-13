const User = require('../models/user.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    }

    // Create a user
    const user = new User({

        email: req.body.email,
        password: req.body.password

    });

    // Save user in the database
    user.save()
        .then(() => {
            return user.generateAuthToken();
            // res.send(data);
        }).then((token) => {

            res.header('x-auth', token).send(user);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};





// Retrieve and return all users from the database.
exports.findAll = (req, res) => {


    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};




// Find a user
exports.login = (req, res) => {

    var query = { $and: [{ email: req.body.email, }, { password: req.body.password }] }

    User.find(query)
        .then(user => {

                return res.status(200).send({
                    message: "Success",
                    status: user
                });



        }).catch(err => {

            return res.status(500).send({
                message: "Error login"
            });
        });


};