const MessageModel = require("../../models/messagesModel");

const allMessages = (req, res) => {

    MessageModel.find({})
        .then((messages) => {
            console.log(messages);
        })
        .catch((error) => {
            console.log(error);
        })
}

module.exports = allMessages;