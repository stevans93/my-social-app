const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello')
});

server.listen(4000, () => {
    console.log('Server Port 4000');
});