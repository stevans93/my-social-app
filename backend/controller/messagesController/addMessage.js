const { httpStatus } = require("../../config/constants");
const MessageModel = require("../../models/messagesModel");

const addMessage = (req, res) => {
    const { _id } = req.locals;
    const { userId } = req.params;

    const newMessage = { senderId: _id, receiverId: userId, ...req.body };

    let addMessage = new MessageModel(newMessage);

    addMessage.save()
        .then((message) => {
            res.send({ message });
        })
        .catch((error) => {
            res.status(httpStatus.NOT_HAVE_PERMISSION.status).send({ message: error.message });
        });
};

module.exports = addMessage;