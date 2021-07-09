// configurar o express
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const input = require('./input')

//FORMA DE CONEXÃƒO LOCAL ON-PREMISSEn
const db = require("../app/databases");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
        input.init()
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    })

app.listen(8888, () => { console.log('Server started.') })