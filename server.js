const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// create express app
const app = express();


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());




// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");

}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});




app.use(express.static(path.join(__dirname, 'frontend')));



// define a simple route
// app.get('/', (req, res) => {
//     res.json({ "message": "Welcome to MedicIT application." });

// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});





// Require Notes routes
require('./app/routes/item-master.routes.js')(app);
require('./app/routes/supplier-master.routes.js')(app);
require('./app/routes/order-list.routes.js')(app);
require('./app/routes/user-master.routes.js')(app);
require('./app/routes/billing.routes.js')(app);
require('./app/routes/inventory.routes.js')(app);
require('./app/routes/expense.routes.js')(app);
require('./app/routes/report.routes.js')(app);





// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3000");
});