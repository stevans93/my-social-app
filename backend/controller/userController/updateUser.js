const updateUser = (req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.send('Update Users');
}

module.exports = updateUser;