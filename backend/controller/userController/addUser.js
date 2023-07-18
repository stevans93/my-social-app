const addUser = (req, res) => {
    console.log(req.body);
    res.send('All Users');
}

module.exports = addUser;