const {Schema, model} = require("mongoose");

const AdsSchema = new Schema({
    title: {type: String, require: true},
    body: {type: String, require: true},
    image: {type: String, require: true},
    startDate: {type: Date, require: true},
    endDate: {type: Date, require: true},
    price: {type: Number, require: true},
    duration: {type: Number, require: true},
    userId: {type: Schema.Types.ObjectId, require: true},
});

const AdsModel = model("ads", AdsSchema);
module.exports = AdsModel;