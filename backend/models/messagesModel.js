const { Schema,  model } = require("mongoose");

const MessagesSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    createdAt: {type: Date, default: () => new Date().getTime()},
    message: {type: String, required: true},
    viewAt: {type: Date, default: null}
});

const MessageModel = model("messages", MessagesSchema);
module.exports = MessageModel;