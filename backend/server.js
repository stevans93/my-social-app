const express = require('express');
const server = express();

server.use(express.json());

server.use('/api', require('./routes'));

server.listen(4000, () => {
    console.log('Server Port 4000');
});