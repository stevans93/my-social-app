const UserModel = require("../../models/userModel");

const getUser = (req, res) => {
    const userId = req.params.id;

    UserModel.findById(userId)
        .then((user) => {
            if(!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.send(user);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        })
}

module.exports = getUser;