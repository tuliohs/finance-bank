// configurar variÃ¡veis de ambiente
//require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express()

const corsOptions = { origin: '*' }
app.use(cors(corsOptions))

//FORMA DE CONEXÃƒO LOCAL ON-PREMISSEn
const db = require("./app/databases");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use(express.json())


app.use('/api/v1/auth', require('./app/routes/auth.routes'))

app.listen(9098, () => console.log('Server started.'))