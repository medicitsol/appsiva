const Inventory = require('../models/inventory.master.model');






// Retrieve and return all items from the database.
exports.getBalanceQuantity = (req, res) => {
    Inventory.aggregate(


        [{
            $match: { "item_id": req.params.itemId },
        }, {
            $group: {
                _id: null,
                itemQuantity: {
                    $sum: "$itemQuantity"
                }
            }
        }])

        .then(items => {
            res.send(items);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });

};





// Retrieve and return all items from the database.
exports.itemMovement = (req, res) => {
    Inventory.find({ itemCode: req.params.itemCode })
        .then(items => {
            res.send(items);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });
};









// Retrieve and return all items from the database.
exports.getAllExpiryDates = (req, res) => {
    Inventory.find({ invDocType: { $ne: 'BILLING' }, itemCode: req.params.itemCode, itemExpiryDate: { $ne: null } })
        .then(inventoryExpiryDates => {
            res.send(inventoryExpiryDates);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });

};









// Retrieve and return all items from the database.
exports.getItemQuantityByExpirydate = (req, res) => {
    Inventory.aggregate(


        [{
            $match: { "itemCode": req.body.itemId, "itemExpiryDate": req.body.itemExpiryDate },
        }, {
            $group: {
                _id: null,
                itemQuantity: {
                    $sum: "$itemQuantity"
                }
            }
        }])

        .then(qtyBalance => {
            res.send(qtyBalance);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            });
        });

};