const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
const server = express();

mongoose.connect(dbUrl)
    .then(()=>console.log("Connected to DB"))
    .catch((error) => console.log(error));

server.use(express.json());

server.use('/api', require('./routes'));

server.listen(process.env.PORT, () => {
    console.log('Server Port 4000');
});