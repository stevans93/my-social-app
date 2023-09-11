const { httpStatus } = require("../../config/constants");
const AdsModel = require("../../models/adsModel");
const { joinPostUser } = require("../../stages/joins");

const allAds = (req, res) => {

    const currentDate = new Date();

    AdsModel.aggregate([
        {$match: {endDate: {$gte: currentDate}}},
        {$match: {startDate: {$lte: currentDate}}},
        ...joinPostUser
    ])
        .then((ads) => {
            res.send(ads);
        })
        .catch((error) => {
            res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message});
        })
}

module.exports = allAds;