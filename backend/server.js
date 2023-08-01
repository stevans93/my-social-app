const express = require('express');
const mongoose = require('mongoose');
const { DB_URL, PORT } = require('./config/config');
const server = express();

mongoose.connect(DB_URL)
    .then(()=>console.log("Connected to DB"))
    .catch((error) => console.log(error));

server.use(express.json());

server.use('/api', require('./routes'));

server.listen(PORT, () => {
    console.log('Server Port 4000');
});