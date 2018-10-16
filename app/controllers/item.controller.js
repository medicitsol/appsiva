const Item = require('../models/item-master.model.js');
const Inventory = require('../models/inventory.master.model');
const leftPad = require('left-pad')

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.itemName) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }

    var itemCodeSliced = req.body.itemName.slice(0, 2);


    Item.find({ itemCode: { $regex: itemCodeSliced, $options: "$i" } }).limit(1).sort({ $natural: -1 })
        .then(lastItem => {

            var setItemCode;
            var convertedItemCode = 0;
            var convertedItemCodeFinal = 0;
            var stringItemCount;
            var selectedLetter;

            var finalItemCode;

            var capitalizedItemCode;


            if (lastItem.length > 0) {


                setItemCode = lastItem[0].itemCode.slice(2, 5);
                convertedItemCode = parseInt(setItemCode);
                convertedItemCodeFinal = convertedItemCode + 1;


                selectedLetter = lastItem[0].itemName.slice(0, 2);

                finalItemCode = selectedLetter + leftPad(convertedItemCodeFinal, 3, 0);
                capitalizedItemCode = finalItemCode.toUpperCase();


            } else {
                itemCode = 0 + 1;

                convertedItemCodeFinal = 0 + 1;

                finalItemCode = itemCodeSliced + leftPad(convertedItemCodeFinal, 3, 0);
                capitalizedItemCode = finalItemCode.toUpperCase();

            }





            // Create an Item
            const item = new Item({

                // itemCode: req.body.itemCode,
                itemCode: capitalizedItemCode,
                itemName: req.body.itemName,
                reorderLevel: req.body.reorderLevel,
                orderQuantity: req.body.orderQuantity,
                unit: req.body.unit,
                price: req.body.price,
                shortExpiry: req.body.shortExpiry,
                status: 'NEW'

            });


            // // finf item name available on database
            // Item.findOne({ 'itemName': req.body.itemName }).then(itemRes => {
            //     if (!itemRes) {


            // Save Item in the database
            item.save()
                .then(data => {

                    res.send(data);






                    // res.send(lastItem);








                    // Item.update({
                    //     _id: data._id
                    // }, {
                    //         // $set: { "items.$.order": 50 }
                    //         // $set: { $inc: { "items.$.order": -1 } }
                    //         $inc: { "itemCode": 1 }
                    //     },


                    //     { new: true })
                    //     .then(order => {
                    //         if (!order) {
                    //             return res.status(404).send({
                    //                 message: "Order not found"
                    //             });
                    //         }
                    //         res.send(order);
                    //     }).catch(err => {
                    //         if (err.kind === 'ObjectId') {
                    //             return res.status(404).send({
                    //                 message: "Order not found with id"
                    //             });
                    //         }
                    //         return res.status(500).send({
                    //             message: "Error updating order"
                    //         });
                    //     });







                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Item."
                    });
                });



        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });



    // } else {

    //     return res.status(400).send({
    //         message: "Item name already exist"
    //     });

    // }

    // }).catch(err => {
    //     return res.status(500).send({
    //         message: "Something went wrong",
    //         error: err
    //     });
    // });

};









// Retrieve and return all items from the database.
exports.findAll = (req, res) => {
    // Item.find()
    //     .then(items => {
    //         res.send(items);
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while retrieving items."
    //         });
    //     });


    var options = {
        sort: { updatedAt: -1 },
        limit: 20
    };


    Item.paginate({ status: { $ne: 'DELETED' } }, options)
        .then(items => {
            res.send(items);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });

};






















// Retrieve and return date range items from the database.
// filter dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// exports.findAll = (req, res) => {
//     Item.find({ "createdAt": { "$gte": '2018-08-21T19:27:40.855Z', "$lt": '2018-08-21T19:27:53.265Z' } })
//         .then(items => {
//             res.send(items);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving items."
//             });
//         });
// };










// Find a single item with a itemId
exports.findOne = (req, res) => {

    Item.findById(req.params.itemId)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error retrieving item with id " + req.params.itemId
            });
        });
};












// Update an item identified by the itemId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.itemName) {
        return res.status(400).send({
            message: "Item name can not be empty"
        });
    }

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {

        itemName: req.body.itemName,
        reorderLevel: req.body.reorderLevel,
        orderQuantity: req.body.orderQuantity,
        unit: req.body.unit,
        price: req.body.price,
        shortExpiry: req.body.shortExpiry,
        status: req.body.status

    }, { new: true })
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error updating item with id " + req.params.itemId
            });
        });
};









// Delete an item with the specified itemId in the request
exports.delete = (req, res) => {
    Item.findByIdAndRemove(req.params.itemId)
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send({ message: "Item deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Could not delete item with id " + req.params.itemId
            });
        });
};














// Update an item identified by the itemId in the request
exports.itemdelete = (req, res) => {

    // Find item and update it with the request body
    Item.findByIdAndUpdate(req.params.itemId, {


        status: req.body.status

    }, { new: true })
        .then(item => {
            if (!item) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            res.send(item);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.itemId
                });
            }
            return res.status(500).send({
                message: "Error updating item with id " + req.params.itemId
            });
        });
};
