const Supplier = require('../models/supplier-master.model.js');

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.supplierName) {
        return res.status(400).send({
            message: "Supplier name can not be empty"
        });
    }




    Supplier.find().limit(1).sort({ $natural: -1 })
        .then(lastSupplier => {

            var supplierCode = 0;

            if (lastSupplier.length > 0) {
                supplierCode = lastSupplier[0].supplierCode + 1;
            } else {
                supplierCode = 0 + 1;
            }



            // Create an Item
            const supplier = new Supplier({

                supplierCode: supplierCode,
                supplierName: req.body.supplierName,
                contactNo: req.body.contactNo,
                email: req.body.email,
                status: 'NEW'

            });

            // Save Item in the database
            supplier.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the supplier."
                    });
                });



        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });
};








// Retrieve and return all items from the database.
exports.findAll = (req, res) => {

    var options = {
        sort: { updatedAt: -1 },
        limit: 20
    };

    Supplier.paginate({ status: { $ne: 'DELETED' } }, options)
        .then(suppliers => {
            res.send(suppliers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving suppliers."
            });
        });
};






// Find a single item with a itemId
exports.findOne = (req, res) => {
    Supplier.findById(req.params.supplierId)
        .then(supplier => {
            if (!supplier) {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            res.send(supplier);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            return res.status(500).send({
                message: "Error retrieving supplier with id " + req.params.supplierId
            });
        });
};












// Update an item identified by the itemId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.supplierName) {
        return res.status(400).send({
            message: "Supplier name can not be empty"
        });
    }

    // Find item and update it with the request body
    Supplier.findByIdAndUpdate(req.params.supplierId, {

        supplierName: req.body.supplierName,
        contactNo: req.body.contactNo,
        email: req.body.email,
        status: 'UPDATED'

    }, { new: true })
        .then(supplier => {
            if (!supplier) {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            res.send(supplier);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            return res.status(500).send({
                message: "Error updating supplier with id " + req.params.supplierId
            });
        });
};














// Update an item identified by the itemId in the request
exports.deletesupplier = (req, res) => {

    // Find item and update it with the request body
    Supplier.findByIdAndUpdate(req.params.supplierId, {

        status: req.body.status

    }, { new: true })
        .then(supplier => {
            if (!supplier) {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            res.send(supplier);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            return res.status(500).send({
                message: "Error updating supplier with id " + req.params.supplierId
            });
        });
};









// Delete an item with the specified itemId in the request
exports.delete = (req, res) => {
    Supplier.findByIdAndRemove(req.params.supplierId)
        .then(supplier => {
            if (!supplier) {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            res.send({ message: "Supplier deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Supplier not found with id " + req.params.supplierId
                });
            }
            return res.status(500).send({
                message: "Could not delete supplier with id " + req.params.supplierId
            });
        });
};